import config from '../config'
import {mergeRecursive} from "../helpers/mergeObjects";


class ApiClass {
    constructor() {
        this.url = `${config.apiUrl}`;
    }

    makeRequest = ({url, data, token}) => {
        const _data = {
            headers: {
                'Content-Type': 'application/json',
                ...{Authorization: token && `Bearer ${token}`}
            }
        };

        const mergedData = mergeRecursive(data, _data);

        return fetch(url, mergedData)
            .then(response => {
                if (response.status === 204) {
                    return true
                }
                if (response.status === 401) {
                    // this.refresh_token();
                    this.refresh_token()
                        .then(response => {
                            localStorage.setItem('token', response.access);


                        });

                    return data;
                }

                return response.json().then(data => {
                    if (response.status >= 300) {
                        return data.message
                    }
                    return data;

                });
            })
            .catch(e => Error(e));

    };

    refresh_token = () => {
        return this.makeRequest({
            url: `${this.url}/token/refresh/`,
            data: {
                method: 'POST',
                body: JSON.stringify({
                    refresh: localStorage.refresh,

                })
            }
        })
    };

    fetchCreateUser = user => {
        return this.makeRequest({
            url: `${this.url}/users/`,
            data: {
                method: 'POST',
                body: JSON.stringify({
                    username: user.username,
                    password: user.password,
                    email: user.email,
                    first_name: user.firstname,
                    last_name: user.lastname
                })
            }
        })
    };


    fetchLoginUser = user => {
        return this.makeRequest({
            url: `${this.url}/token/`,
            data: {
                method: 'POST',
                body: JSON.stringify({
                    username: user.username,
                    password: user.password
                })
            }
        })
    };

    fetchDataUser = () => {
        return this.makeRequest({
            url: `${this.url}/user_data/`,
            data: {
                method: 'GET',

            },
            token: localStorage.token
        })
    };

    fetchPosts = () => {
        return this.makeRequest({
            url: `${this.url}/posts/`,
            data: {
                method: 'GET'
            }
        })
    };

    fetchLikePost = id => {
        return this.makeRequest({
            url: `${this.url}/posts/${id}/like/`,
            data: {
                method: 'GET',
            },
            token: localStorage.token

        })
    };

    fetchUnLikePost = id => {
        return this.makeRequest({
            url: `${this.url}/posts/${id}/unlike/`,
            data: {
                method: 'GET',
            },
            token: localStorage.token

        })
    };

    fetchCreatePost = post => {
        return this.makeRequest({
            url: `${this.url}/posts/`,
            data: {
                method: 'POST',
                body: JSON.stringify({
                    title: post.title,
                    content: post.content
                })
            },
            token: localStorage.token

        })
    };
    fetchLikedPosts = () => {
        return this.makeRequest({
            url: `${this.url}/liked_posts/`,
            data: {
                method: 'GET'
            },
            token: localStorage.token

        })
    };

    fetchDeletePost = (id) => {
        return this.makeRequest({
            url: `${this.url}/posts/${id}/`,
            data: {
                method: 'DELETE'

            },
            token: localStorage.token
        })
    };
    fetchPost = (id) => {
        return this.makeRequest({
            url: `${this.url}/posts/${id}/`,
            data: {
                method: 'GET'

            },
        })
    };
    fetchPatchPost = (post, id) => {
        return this.makeRequest({
            url: `${this.url}/posts/${id}/`,
            data: {
                method: 'PATCH',
                body: JSON.stringify({
                    title: post.title,
                    content: post.content
                })


            },
            token: localStorage.token

        })
    };
    fetchUserPost = (username) => {
        return this.makeRequest({
            url: `${this.url}/user_posts/${username}/`,
            data: {
                method: 'GET'
            },
            token: localStorage.token
        })
    }
}


const Api = new ApiClass();
export default Api;