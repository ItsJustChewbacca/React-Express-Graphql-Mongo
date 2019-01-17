import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App, { waitOnCache, client } from './App';
import * as serviceWorker from './serviceWorker';
import { restoreRequests } from './helpers/offline';

// Wait for the cache to sync before starting the app
waitOnCache.then(() => {
	restoreRequests(client);
	ReactDOM.render(<App />, document.getElementById('root'));
});

serviceWorker.register();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA

