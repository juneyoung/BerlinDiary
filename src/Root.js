import React from 'react';
import { Provider } from 'react-redux';
import store from './store';

import App from './components/service/App';
import AdminApp from './components/admin/AdminApp';
import { BrowserRouter as Router, Route } from "react-router-dom";

const Root = () => {
	return (<Provider store={ store }>
			<Router>
				<div>
					<Route exact path='/' component={ App } />
					<Route path = "/admin" component = { AdminApp } />
				</div>
			</Router>
		</Provider>)
}

export default Root;