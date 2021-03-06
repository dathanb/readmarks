import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducer';
import { ReadmarksApi, Context } from './readmarksApi';
import { ChromeApi } from './chromeApi';
import { BookmarksStorageApi } from './storageApi';
const store = createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const contextApi = Context;
const chromeApi = new ChromeApi();
const storageApi = new BookmarksStorageApi(chromeApi, contextApi);
const readmarksApi = new ReadmarksApi(chromeApi, storageApi);

ReactDOM.render(<Provider store={store}><App readmarksApi={readmarksApi}/></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
