import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Posts from '../components/posts/Posts'
import UserPosts from '../components/posts/UserPosts'
import SignIn from '../components/users/SignIn'
import SignUp from '../components/users/SignUp'
import Profile from '../components/users/Profile'
import Header from '../components/Header'
import history from '../history';
import CreatePost from '../components/posts/CreatePost'
import LikedPosts from '../components/posts/LikedPosts'
import EditPost from "../components/posts/EditPost";


const router = (
    <Router history={history}>
        <div>
            <div>
                <Header/>
            </div>
            <Switch>
                <Route exact path="/" component={Posts}/>
                <Route path="/login/" component={SignIn}/>
                <Route path="/signup/" component={SignUp}/>
                <Route path="/profile/" component={Profile}/>
                <Route path="/createpost/" component={CreatePost}/>
                <Route path="/likedposts/" component={LikedPosts}/>
                <Route path='/editpost/:id' component={EditPost}/>
                <Route path='/posts/:username' component={UserPosts}/>
            </Switch>
        </div>
    </Router>);

export default router