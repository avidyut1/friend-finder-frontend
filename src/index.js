import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import {UIRouter, UIView} from '@uirouter/react';
import router from './Router';

ReactDOM.render(
    <UIRouter router={router}>
        <UIView/>
    </UIRouter>,
    document.getElementById('root')
);

registerServiceWorker();
