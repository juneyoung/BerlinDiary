import React, { Component } from 'react';

export default class StaticFooter extends Component {
	
	constructor () {
		super();
		this.state = {
			debuggingName : 'footer'
		}
	}

	render () {

		return (
			<div className='footer'>
				<div className='footerContent'>
					{ this.state.debuggingName }<br/>
					{ this.state.debuggingName }<br/>
					{ this.state.debuggingName }<br/>
					{ this.state.debuggingName }<br/>
					{ this.state.debuggingName }<br/>
				</div>
			</div>
		)
	}
}