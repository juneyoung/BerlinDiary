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


		return (
			<div className="bg_video">
				<video with='100%' height='auto;' autoplay='true'>
					<source src="assets/media/dock.mp4" type="video/mp4"></source>
				</video>
			</div>
		)
	}
}