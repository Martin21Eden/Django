import {applyMiddleware, createStore, combineReducers, compose} from "redux";
import thunk from "redux-thunk";
import usersReducer from './users/reducer'
import postsReducer from './posts/reducer'


const middleware = compose(
   applyMiddleware(thunk),
window.devToolsExtension ? window.devToolsExtension() : f => f
);

const rootReducer = combineReducers({
   usersState: usersReducer,
   postsState: postsReducer,
});


const store = createStore(rootReducer, middleware);


export default store;