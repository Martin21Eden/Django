const initialState = {
    posts: [],
    userPosts: [],
    likedPosts: [],
    edit_post: {},
    notification: null
};


export default function postsReducer(state = initialState, action) {
    // console.log('action', action);
    // console.log('state', state);

    const {payload} = action;
    switch (action.type) {
        case 'LIST_POSTS':
            return {
                ...state, posts: [...action.payload],
            };
        case 'SET_LIKE_POST':
            return {
                ...state,
                posts: state.posts.map(i => i.id === payload.id ? payload : i),
                likedPosts: state.likedPosts.filter(function (i) {
                    return i.id !== payload.id
                })
            };
        case 'SET_LIKED_POST':
            return {
                ...state,
                likedPosts: [...action.payload]
            };
        case 'DELETE_POST':
            return {
                ...state, posts: state.posts.filter(function (i) {
                    return i.id !== payload.id
                })

            };
        case 'EDIT_POST':
            return {
                ...state, edit_post: action.payload
            };
        case 'SET_NOTIFICATION':
            return {
                ...state, notification: action.payload
            };
        case 'DEL_NOTIFICATION':
            return {
                ...state, notification: false
            };
               case 'USER_POST':
            return {
                ...state, userPosts: [...action.payload],
            };
        default:
            return state;
    }
}
