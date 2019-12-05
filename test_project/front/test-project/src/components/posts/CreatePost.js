import React, {Component} from 'react';
import {connect} from 'react-redux';
import { CreatePostFetch } from '../../store/posts/actions';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import {withStyles} from '@material-ui/core/styles';
import FormPost from './PostForm'


const styles = theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    }
});

class CreatePost extends Component {

    render() {
        const {classes, CreatePostFetch, history} = this.props;

        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <div className={classes.paper}>

                    <FormPost onSubmit={CreatePostFetch} history={history}
                    />
                </div>
            </Container>
        );
    }
}


const mapDispatchToProps = (dispatch, {history}) => ({
    CreatePostFetch: userInfo => dispatch(CreatePostFetch(userInfo, history))
});

export default connect(null, mapDispatchToProps)(withStyles(styles)(CreatePost));

