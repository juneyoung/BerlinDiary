import React, { Component } from 'react';
import { Link } from "react-router-dom";

export default class AdminApp extends Component {
	
	constructor() {
		super();
		this.state = {
			componentName : 'adminComponent'
		}
	}

	
	render () {
		return (
			<div>
				<p> { this.state.componentName } </p>
				<Link to='/'>
					Service Page
				</Link>
			</div>
		);
	}
}