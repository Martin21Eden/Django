import React, {Component} from "react";
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import {withStyles} from "@material-ui/core";


const styles = theme => ({

    '@global': {
        body: {
            backgroundColor: theme.palette.common.white,
        },
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    like: {
        display: 'flex',
        alignItems: 'center',
    },
});

class Like extends Component {
    render = () => {
        const {like, classes} = this.props;
        if (like === 0) {
            return <ThumbUpAltIcon/>
        } else {
            return <div className={classes.like}><ThumbUpAltIcon/>{like}</div>
        }
    }
}

export default (withStyles(styles)(Like))
