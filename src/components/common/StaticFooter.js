import React, { Component } from 'react';

export default class StaticFooter extends Component {
	
	constructor () {
		super();
		this.state = {
			debuggingName : 'footer'
			, linkedinProfile : 'https://www.linkedin.com/in/juneyoung/?locale=en_US'
		}
		this.openSNSTab = this.openSNSTab.bind(this);
	}

	openSNSTab (type) {
		if(type === 'linkedin') {
			window.open(this.state.linkedinProfile);
		}
	}

	render () {
		// https://stackoverflow.com/questions/41668430/react-a-tag-and-button-onclick-propagation
		return (
			<div className='footer'>
				<div className='footerContent'>
					{ 'Contents created by JuneyoungOh' }<br/>
					{ 'Feel free to contact' } <br/>
					<a target='_blank' href={ this.state.linkedinProfile }>{ 'LinkedIn profile ' }</a><br/>
				</div>
			</div>
		)
	}
}