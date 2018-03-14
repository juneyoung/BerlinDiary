import React, { Component } from 'react';

export default class MainBanner extends Component {
	
	constructor() {
		super();
		this.state = {
			debuggingName : 'Main_Banner'
			, githubUrl : "https://github.com/juneyoung/BerlinDiary"
		}

		this.openGitHub = this.openGitHub.bind(this);
	}

	openGitHub(){
		console.log(this);
		window.open(this.state.githubUrl);
	}

	render () {
		return (
			<div className='mainBanner'>
				<div className='titleHolder'>
					印象柏林
					<p>Impression of Berlin</p>
				</div>
				<div className='float_info'>
					<img className='githubLog' alt='GitHub Logos' src='../assets/images/logos/GitHub_Logo_White.png' onClick={this.openGitHub} />
				</div>
			</div>
		)
	}
}