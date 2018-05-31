import React, { Component } from 'react';
import { Link } from "react-router-dom";
import PostList from './PostList';
import StaticFooter from '../common/StaticFooter';
import '../../assets/css/yourStyleAdmin.css';

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
				<div className='admin_navi'>
					<Link to='/'>
						Service Page
					</Link>
				</div>
				<div className='admin_contanier'>
					<PostList />
				</div>
				<StaticFooter />
			</div>
		);
	}
}