import Api from '../../api'


export const userSignUpFetch = (user, history) => {
    return dispatch => {
        return Api.fetchCreateUser(user)
            .then(data => {
                if (data.message) {
                    //Тут прописываем логику
                } else {
                    dispatch(SetUserData(data));
                    dispatch(userLoginFetch(user, history));
                }
            })
            .catch(error => {
                console.log(error);
            })
    }
};


export const userLoginFetch = (user, history) => {
    return dispatch => {
        return Api.fetchLoginUser(user)
            .then(data => {
                console.log('userLoginFetch', data)
                if (data.message) {
                    //Тут прописываем логику
                } else {
                    localStorage.setItem('token', data.access);
                    localStorage.setItem('refresh', data.refresh);
                    dispatch(setToken(data));
                    dispatch(setUsername(user.username));
                    localStorage.setItem('username', user.username);

                    history.replace('/')
                }
            })
            .catch(error => {
                console.log(error);
            })
    }
};


export const getProfileFetch = () => {
    return dispatch => {
        return Api.fetchDataUser()
            .then(data => {
                if (data.message) {
                    //Тут прописываем логику
                } else {
                     dispatch(SetUserData(data));
                }
            })
            .catch(error => {
                console.log(error);
            })
    }
};

const setUsername = username => ({
    type: 'SET_USERNAME',
    payload: username
});

const SetUserData = userObj => ({
    type: 'SET_USER_DATA',
    payload: userObj
});

const setToken = (payload) => ({
    type: 'SET_TOKEN',
    payload
});

export const LogoutUser = (history) => {
    return dispatch => {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        localStorage.removeItem("refresh");

        history.push("/");

        dispatch({
            type: 'LOGOUT_USER'
        })
    }
};


