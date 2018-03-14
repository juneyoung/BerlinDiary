import React, { Component } from 'react';
import MainBanner from './MainBanner';

export default class MainContainer extends Component {
	constructor () {
		super();
		this.state = {
			debuggingName : 'Main Container Area'
		}
	}

	render () {
		return (
			<div className='mainContainer'>
				<MainBanner />
				<div className='contentsHolder'>
					1. put Title inside here <br/>
					2. put PullToRefresh List... 
				</div>
			</div>
		)
	}
}