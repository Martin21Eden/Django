import React, {Component} from 'react';
import {connect} from 'react-redux';
import {GetPost, PatchPost} from '../../store/posts/actions';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import {withStyles} from '@material-ui/core/styles';
import FormPost from './PostForm'
import {userLoginFetch} from "../../store/users/actions";


const styles = theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    }
});

class EditPost extends Component {

    componentDidMount() {
        const {id} = this.props.match.params;
        const {GetPost} = this.props;
        GetPost(id);
    }


    render() {
        const {classes, postsState, PatchPost} = this.props;
        const {id} = this.props.match.params;

        const post = postsState.edit_post;
        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <div className={classes.paper}>
                    <FormPost title={post.title}
                              content={post.content}
                              id={id}
                              onSubmit={PatchPost}
                    />
                </div>
            </Container>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    PatchPost: (post, id, history) => dispatch(PatchPost(post, id, history)),
    GetPost: (id) => dispatch(GetPost(id))
});


const mapStateToProps = ({postsState}) => ({postsState});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(EditPost));
