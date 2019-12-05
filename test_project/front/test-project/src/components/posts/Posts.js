import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import {connect} from 'react-redux';
import {delNotification, PostFetch} from '../../store/posts/actions'
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


class Posts extends Component {

  componentDidMount() {
    const {postsState, delNotification} = this.props;
    if (postsState.posts.length === 0) {
      this.props.PostFetch();

    }
    if(postsState.notification ) {
    setTimeout(() => {
      delNotification();
    }, 6000)

      // delNotification();
    }
  }



  render() {
    const {classes, postsState} = this.props;
    return (
        <Container component="main" className={classes.container}>
          {postsState.notification === 'create' ? <MySnackbar variant="success" message="The Post has been created!"/> : null}
          {postsState.notification === 'delete' ? <MySnackbar variant="success" message="The Post has been deleted!"/> : null}
          {postsState.notification === 'edit' ? <MySnackbar variant="success" message="The Post has been edited!"/> : null}

          {postsState.posts &&
          postsState.posts.map((item) => {
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
  PostFetch,
  delNotification
};

const mapStateToProps = ({postsState}) => ({postsState});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Posts));

