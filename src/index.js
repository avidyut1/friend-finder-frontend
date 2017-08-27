import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import {UIRouter, UIView} from '@uirouter/react';
import router from './Router';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import allReducer from "./reducers/index";

const store = createStore(
   allReducer
);

ReactDOM.render(
    <Provider store={store}>
        <UIRouter router={router}>
            <UIView/>
        </UIRouter>
    </Provider>,
    document.getElementById('root')
);

registerServiceWorker();
