import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import './assets/css/yourStyle.css';
import './assets/css/yourStyle.css';
import App from './App';
import AdminApp from './AdminApp';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router, Route } from "react-router-dom";
//import { Router, Route, browserHistory, IndexRoute } from 'react-router'; 	/* OLD REACT ROUTER */

// ReactDOM.render(<App />, document.getElementById('root'));  					/* ORIGINAL DOM */


// ReactDOM.render(<BrowserRouter history={ browserHistory }>  					/* OLD REACT ROUTER */
// 		<Route path='/' component={ App }>
// 			<Route path = "admin" component = { AdminApp } />
// 		</Route>
// 	</BrowserRouter>, document.getElementById('root'));


ReactDOM.render(<Router>
		<div>
			<Route exact path='/' component={ App } />
			<Route path = "/admin" component = { AdminApp } />
		</div>
	</Router>, document.getElementById('root'));
registerServiceWorker();
