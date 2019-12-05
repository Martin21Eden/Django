const initialState = {
    currentUser: {},
    auth: {},
    username: null
};

export default function usersReducer(state = initialState, action) {
    // console.log('action', action);
    // console.log('state', state);

    switch (action.type) {
        case 'SET_USERNAME':
            return {...state, username: action.payload};
        case 'SET_USER_DATA':
            return {...state, currentUser: {...action.payload}};
        case 'LOGOUT_USER':
            return {...state, auth: {}};
        case 'SET_TOKEN':
            return {...state, auth: {...action.payload}};
        default:
            return state;
    }
}
