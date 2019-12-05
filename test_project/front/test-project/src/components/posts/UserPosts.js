import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import {connect} from 'react-redux';
import { PatchUserPost } from '../../store/posts/actions'
import Container from "@material-ui/core/Container";
import Post from './Post'
import MySnackbar from "../snackbars";

const styles = theme => ({
  container: {
    marginTop: theme.spacing(2),
    flexDirection: 'column',
    alignItems: 'center',
  }
});


class UserPosts extends Component {

  componentDidMount() {
    const {postsState} = this.props;
    const {username} = this.props.match.params;
    if (postsState.userPosts.length === 0) {
      this.props.PatchUserPost(username);


    }
  }



  render() {
    const {classes, postsState} = this.props;
    return (
        <Container component="main" className={classes.container}>

          {postsState.userPosts &&
          postsState.userPosts.map((item) => {
            return (
                <Post
                    key={item.id}
                    item={item}
                    classes={classes}
                />
            );
          })}
        </Container>
    );
  }
}


const mapDispatchToProps = {
  PatchUserPost,
};

const mapStateToProps = ({postsState}) => ({postsState});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(UserPosts));

