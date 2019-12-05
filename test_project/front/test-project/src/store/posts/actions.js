import Api from '../../api'


export const PostFetch = () => {
    return dispatch => {
        return Api.fetchPosts()
            .then(payload => {
                if (payload.message) {
                    //Тут прописываем логику
                } else {
                    dispatch({
                        type: 'LIST_POSTS',
                        payload: payload,
                    });

                }
            })
            .catch(error => {
                console.log(error);
            })
    }
};


export const LikedPostsFetch = () => {
    return dispatch => {
        return Api.fetchLikedPosts()
            .then(payload => {
                if (payload.message) {
                    //Тут прописываем логику
                } else {
                    dispatch({
                        type: 'SET_LIKED_POST',
                        payload: payload,
                    });

                }
            })
            .catch(error => {
                console.log(error);
            })
    }
};

export const CreatePostFetch = (post, history) => {
    return dispatch => {

        return Api.fetchCreatePost(post)
            .then(payload => {
                if (payload.message) {
                    //Тут прописываем логику
                } else {
                    dispatch(setNotification('create'));
                    history.replace('/');


                }
            })
            .catch(error => {
                console.log(error);
            })
    }
};

export const LikePostFetch = (id) => {
    return dispatch => {

        return Api.fetchLikePost(id)
            .then(payload => {
                dispatch({
                    type: 'SET_LIKE_POST',
                    payload: payload,
                });
            })
            .catch(error => {
                console.log(error);
            })
    }
};


export const UnLikePostFetch = (id) => {
    return dispatch => {
        return Api.fetchUnLikePost(id)
            .then(payload => {
                dispatch({
                    type: 'SET_LIKE_POST',
                    payload: payload,
                });
            })
            .catch(error => {
                console.log(error);
            })
    }
};

export const DeletePost = (id) => {
    return dispatch => {
        return Api.fetchDeletePost(id)
            .then(data => {
                dispatch({
                    type: 'DELETE_POST',
                    payload: {id: id}
                });
                dispatch(setNotification('delete'));
            })
            .catch(error => {
                console.log(error);
            })
    }
};


export const GetPost = (id) => {
    return dispatch => {
        return Api.fetchPost(id)
            .then(payload => {
                dispatch({
                    type: 'EDIT_POST',
                    payload: payload
                });
                dispatch(setNotification('edit'));

            })
            .catch(error => {
                console.log(error);
            })
    }
};


export const PatchPost = (post, id, history) => {
    return dispatch => {
        return Api.fetchPatchPost(post, id)
            .then(payload => {
                console.log("history", history);
                history.push('/')
                return payload;

            })
            .catch(error => {
                console.log(error);
            })
    }
};


export const PatchUserPost = (username) => {
    return dispatch => {
        return Api.fetchUserPost(username)
            .then(payload => {
                dispatch({
                    type: 'USER_POST',
                    payload: payload
                });
                return payload;

            })
            .catch(error => {
                console.log(error);
            })
    }
};


const setNotification = (notification) => ({
    type: 'SET_NOTIFICATION',
    payload: notification
});

export const delNotification = () => ({
    type: 'DEL_NOTIFICATION',
    payload: false

});