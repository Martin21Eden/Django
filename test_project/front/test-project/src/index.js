import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import router from './routes/router'
import store from './store/rootReducer'


ReactDOM.render(
    <Provider store={store}>
        {router}
    </Provider>,
    document.getElementById('root')
);
