import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import {connect} from 'react-redux';
import {LikedPostsFetch} from '../../store/posts/actions'
import Container from "@material-ui/core/Container";
import Post from './Post'


const styles = theme => ({
  container: {
    marginTop: theme.spacing(2),
    flexDirection: 'column',
    alignItems: 'center',
  }
});


class LikedPosts extends Component {
  componentDidMount() {
    this.props.LikedPostsFetch();

  }

  render() {
    const {classes, postsState} = this.props;
    return (
        <Container component="main" className={classes.container}>
          {postsState.likedPosts &&
          postsState.likedPosts.map((item) => {
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
  LikedPostsFetch
};

const mapStateToProps = ({postsState}) => ({postsState});
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(LikedPosts));