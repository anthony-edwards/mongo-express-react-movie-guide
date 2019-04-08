import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
const DialogTitle = withStyles(theme => ({
  root: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    margin: 0,
    padding: theme.spacing.unit * 2
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing.unit,
    top: theme.spacing.unit,
    color: theme.palette.grey[500]
  }
}))(props => {
  const { children, classes, onClose } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="Close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing.unit * 2
  }
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
  root: {
    borderTop: `1px solid ${theme.palette.divider}`,
    margin: 0,
    padding: theme.spacing.unit
  }
}))(MuiDialogActions);

const spacer = {
  marginTop: "15px",
  marginBottom: "15px"
};
class CustomizedDialogDemo extends React.Component {
  state = {
    open: false
  };

  handleClickOpen = () => {
    this.setState({
      open: true
    });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <div>
        <Button
          variant="outlined"
          color="secondary"
          onClick={this.handleClickOpen}
        >
          {this.props.text}
        </Button>
        <Dialog
          onClose={this.handleClose}
          aria-labelledby="customized-dialog-title"
          open={this.state.open}
        >
          <DialogTitle
            id="customized-dialog-title"
            onClose={this.handleClose}
          >
            {this.props.data.TitleName}
          </DialogTitle>
          <DialogContent>
            <h2>Awards</h2>
            <Typography gutterBottom>
              {this.props.data.Awards &&
                this.props.data.Awards.map((data, index) => {
                  return (
                    <>
                      <ul key={index}>
                        <li>
                          Award Won:
                          {data.AwardWon !== false && (
                            <span role="img">&#129351;</span>
                          )}
                        </li>
                        <li>Award Year: {data.AwardYear}</li>
                        <li>
                          Participants:
                          {data.Participants &&
                            data.Participants.map(data => `${data}, `)}
                        </li>
                        <li>Award: {data.Award}</li>
                        <li>Award Company: {data.AwardCompany}</li>
                      </ul>
                      <Divider
                        style={spacer}
                      />
                    </>
                  );
                })}
            </Typography>
            <h2>Other Names</h2>
            <Typography gutterBottom>
              {this.props.data.OtherNames.map(data => (
                <>
                  <Typography gutterBottom>
                    <strong>Language:</strong>
                    {data.TitleNameLanguage}
                  </Typography>
                  <Typography gutterBottom>
                    <strong>Type:</strong> {data.TitleNameType}
                  </Typography>
                  <Divider
                    style={spacer}
                  />
                </>
              ))}
            </Typography>
            <h2>Participants</h2>
            <Typography gutterBottom>
              {this.props.data.Participants.map(data => (
                <>
                  <Typography gutterBottom>
                    <strong>Role:</strong>
                    {data.RoleType}
                  </Typography>
                  <Typography gutterBottom>
                    <strong>Name:</strong> {data.Name}
                  </Typography>
                  <Divider
                    style={spacer}
                  />
                </>
              ))}
            </Typography>
            <h2>Story Lines</h2>
            <Typography gutterBottom>
              {this.props.data.Storylines.map(data => (
                <>
                  <Typography gutterBottom>
                    <strong>Description:</strong> {data.Description}
                  </Typography>
                  <Typography gutterBottom>
                    <strong>Language:</strong> {data.Language}
                  </Typography>
                  <Typography gutterBottom>
                    <strong>Type:</strong> {data.Type}
                  </Typography>
                  <Divider
                    style={spacer}
                  />
                </>
              ))}
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default CustomizedDialogDemo;
