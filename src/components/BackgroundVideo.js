import React, { Component } from 'react';


export default class BackgroundVideo extends Component {

	constructor () {
		super();
		this.state = {
			debuggingName : 'Background Video Area'
		}
	}
	

	render () {
		/*
			video 태그는 브라우저에 따라 호환이 다름 
		*/
		var backgroundVideoWidth = window.innerWidth;
		var backgroundVideoHeight = 'auto'; // window.innerHeight;

		return (
			<div className="bg_video">
				<video width={ backgroundVideoWidth } height={ backgroundVideoHeight } autoPlay='true'>
					<source src="assets/media/dock.mp4" type="video/mp4"></source>
				</video>
			</div>
		)
	}
}