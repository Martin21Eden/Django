import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';
import {LogoutUser} from "../store/users/actions"
import {connect} from "react-redux";
import {Link, withRouter} from "react-router-dom";


const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
});

class Header extends Component {
    state = {
        anchorEl: null,
        isOpened: false,
    };

    handleOpenClick = event => {
        this.setState(({isOpened}) => ({isOpened: !isOpened}));
        this.setState({anchorEl: event.currentTarget});

    };

    render() {
        const {classes, usersState, history, LogoutUser} = this.props;
        const access = usersState.auth.access;
        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                            <MenuIcon/>
                        </IconButton>
                        <Typography variant="h6" onClick={() => history.push("/")} className={classes.title}>
                            Test-Project
                        </Typography>
                        {access || localStorage.token ?
                            <div>
                                <IconButton
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={this.handleOpenClick}
                                    color="inherit"
                                >
                                    <AccountCircle/>
                                </IconButton>
                                <Menu
                                    onClose={this.handleOpenClick}
                                    anchorEl={this.state.anchorEl}
                                    open={this.state.isOpened}
                                >
                                    <Link to={`/profile/`}>
                                        <MenuItem onClick={this.handleOpenClick}>Profile</MenuItem>
                                    </Link>
                                      <Link to={`/posts/${usersState.username}`}>
                                        <MenuItem onClick={this.handleOpenClick}>My Posts</MenuItem>
                                    </Link>
                                    <Link to={`/createpost/`}>
                                        <MenuItem onClick={this.handleOpenClick}>Create Post</MenuItem>
                                    </Link>
                                    <Link to={`/likedposts/`}>
                                        <MenuItem onClick={this.handleOpenClick}>Liked Posts</MenuItem>
                                    </Link>
                                    <MenuItem onClick={() => LogoutUser(history)}>Sign out</MenuItem>
                                </Menu>
                            </div> :
                            <div>
                                <Button onClick={() => history.push("/login/")} color="inherit">Sign In</Button>
                                <Button onClick={() => history.push("/signup/")} color="inherit">Sign Up</Button>
                            </div>
                        }
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

const mapStateToProps = ({usersState}) => ({usersState});


const mapDispatchToProps = (dispatch) => ({
    LogoutUser: (history) => dispatch(LogoutUser(history)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withStyles(styles)(Header)));
