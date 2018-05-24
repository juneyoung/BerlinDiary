import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import './assets/css/yourStyle.css';
import './assets/css/yourStyle.css';
import App from './App';
import AdminApp from './AdminApp';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router, Route } from "react-router-dom";


ReactDOM.render(<Router>
		<div>
			<Route exact path='/' component={ App } />
			<Route path = "/admin" component = { AdminApp } />
		</div>
	</Router>, document.getElementById('root'));
registerServiceWorker();
