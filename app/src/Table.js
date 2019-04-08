import React, {useState} from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Modal from './Modal';
import Search from "./Search";
const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  table: {
    minWidth: 700
  }
});

let id = 0;
function createData(name, calories, fat, carbs, protein) {
  id += 1;
  return { id, name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9)
];

function SimpleTable(props) {
  const { classes } = props;
  const [data, setData] = useState([])
  const [original, setOriginal] = useState([])
  React.useEffect(() => {
    fetch("http://localhost:3001/api/getData")
      .then(data => data.json())
      .then(res => {
        setData(res.data)
        setOriginal(res.data)
      });
  }, []);
  const search = (e)=>{
    let movies = data;
    if(e.target.value!==''){
      movies = movies.filter(title =>
        title.TitleName.toLowerCase().trim().includes(e.target.value) === true
      )
      setData(movies)
    }
    else{
      setData(original)
    }

  }
  return (
    <>
      <Search align='right' search={search} />
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Genres</TableCell>
              <TableCell>Release Year</TableCell>
              <TableCell>Details</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map(row => (
              <TableRow key={row._id}>
                <TableCell>{row.TitleName}</TableCell>
                <TableCell>{row.Genres.map(genre => `${genre}, `)}</TableCell>
                <TableCell>{row.ReleaseYear}</TableCell>
                <TableCell>
                  <Modal text="Read More" data={row} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </>
  );
}

SimpleTable.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SimpleTable);
