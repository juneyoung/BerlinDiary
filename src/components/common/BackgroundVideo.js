import React, { Component } from 'react';


export default class BackgroundVideo extends Component {

	constructor () {
		super();
		this.state = {
			debuggingName : 'Background Video Area'
			, videoWidth : window.innerWidth
			, videoHeight : 'auto'
		}

		this.updateDimensions = this.updateDimensions.bind(this);
	}

	updateDimensions(){
		this.setState({ videoWidth : window.innerWidth });
	}

	componentWillMount(){
		this.updateDimensions();
	}

	componentDidMount(){
		//https://stackoverflow.com/questions/19014250/reactjs-rerender-on-browser-resize
		window.addEventListener('resize', this.updateDimensions);
		
	}

	componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions);
    }
	

	render () {
		/*
			video 태그는 브라우저에 따라 호환이 다름 
		*/
		var backgroundVideoWidth = this.state.videoWidth;
		var backgroundVideoHeight = this.state.videoHeight; // window.innerHeight;

		return (
			<div className="bg_video">
				<video width={ backgroundVideoWidth } height={ backgroundVideoHeight } autoPlay='true' loop>
					<source src="assets/media/Berlin_timelaps_videvo.m4v" type="video/mp4"></source>
				</video>
			</div>
		)
	}
}