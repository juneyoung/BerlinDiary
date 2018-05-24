import React, { Component } from 'react';

export default class MediaPost extends Component {
	
	constructor (){
		super();
		this.state = {
			componentName : 'mediaPost'
		}
	}

	onPostClick = () => {
		this.props.onPostSelect(this.props.data);
	}

	render () {

		let data = this.props.data || {};
		let mediaType = data.type;
		let title = data.title;
		let resourceUrl = data.mediaUrl;

		let reactContent = (mediaType === 'video') ? 
			(
				<video width='200' height='150'>
					<source src={resourceUrl} type="video/mp4"></source>
				</video>
			) : (
				<img src='assets/images/404.jpg' width='200' height='auto'></img>
			);

		return (
			<div className='mediaPost' onClick={ this.onPostClick }>
				<div>
					{reactContent}
				</div>
				<p> {title} </p>
			</div>
		);
	}
}