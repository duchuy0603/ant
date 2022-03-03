import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';

import App from './App/index';
import * as serviceWorker from './serviceWorker';
import store from './store/store';
import config from './config';
import translations from './translate/translation'
import { IntlReducer as Intl, IntlProvider } from 'react-redux-multilingual'


const app = (
    <Provider store={store}>
       
        <BrowserRouter basename={config.basename}>
            <App />
        </BrowserRouter>
    
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
