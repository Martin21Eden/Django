import React, {Component} from 'react';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import {amber, green} from '@material-ui/core/colors';
import IconButton from '@material-ui/core/IconButton';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import WarningIcon from '@material-ui/icons/Warning';
import {withStyles} from '@material-ui/core/styles';
import Snackbar from "@material-ui/core/Snackbar";


const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
};

const styles = theme => ({
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  info: {
    backgroundColor: theme.palette.primary.main,
  },
  warning: {
    backgroundColor: amber[700],
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1),
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },

});



class MySnackbar extends Component {
  state = {
    isOpened: false,
  };

  componentDidMount = () => {
    return this.handleOpenClick()
  }


  handleOpenClick = () => {
    this.setState(({isOpened}) => ({isOpened: !isOpened}));

  };

  render() {
    const {classes} = this.props;
    const {className, message, onClose, variant, ...other} = this.props;
    const Icon = variantIcon[variant];
    return (

        <Snackbar
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            open={this.state.isOpened}
            autoHideDuration={6000}
            onClose={this.handleOpenClick}
        >
          <SnackbarContent
              className={classes[variant]}
              aria-describedby="client-snackbar"
              message={
                <span id="client-snackbar" className={classes.message}>
            <Icon className={classes.icon}/>
                  {message}
          </span>
              }
              action={[
                <IconButton key="close" aria-label="close" color="inherit" onClick={onClose}>
                  <CloseIcon className={classes.icon}/>
                </IconButton>,
              ]}
              {...other}
          />
        </Snackbar>

    )
  }
}


export default withStyles(styles)(MySnackbar)

