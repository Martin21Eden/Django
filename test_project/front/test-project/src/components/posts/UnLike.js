import React, {Component} from "react";
import ThumbDownAltIcon from '@material-ui/icons/ThumbDownAlt';
import {withStyles} from "@material-ui/core";

const styles = theme => ({

    '@global': {
        body: {
            backgroundColor: theme.palette.common.white,
        },
    },
    unlike: {
        display: 'flex',
        alignItems: 'center',
    },
});

class UnLike extends Component {
    render = () => {
        const {unlike, classes} = this.props;
        if (unlike === 0) {
            return <ThumbDownAltIcon/>
        } else {
            return <div className={classes.unlike}><ThumbDownAltIcon/>{unlike}</div>
        }
    }
}

export default (withStyles(styles)(UnLike))
