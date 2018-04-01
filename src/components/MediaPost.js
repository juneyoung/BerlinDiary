import React, { Component } from 'react';

export default class MediaPost extends Component {
	
	constructor (){
		super();
		this.state = {
			componentName : 'mediaPost'
		}
	}

	render () {

		let mediaType = this.props.data.type;
		let title = this.props.data.title;
		let resourceUrl = this.props.mediaUrl;

		let reactContent = (mediaType === 'video') ? 
			(
				<video width='200' height='150'>
					<source src={resourceUrl} type="video/mp4"></source>
				</video>
			) : (
				<img src='assets/images/404.jpg' width='200' height='auto'></img>
			);

		console.log('reactContent', reactContent);

		return (
			<div className='mediaPost'>
				<div>
					{reactContent}
				</div>
				<p> {title} </p>
			</div>
		);
	}
}

/*

20180325083000
{"seq":0
,"date":20180325083000
,"type":"video"
,"mediaUrl":"http://127.0.0.1:3000/assets/media/dock.mp4",
"title":"Arrived in Berlin International airport"
,"desc":"Arrived in Berlin. Begin life as Berliner"
}

20180325123000
{"seq":1,"date":20180325123000,"type":"photo","mediaUrl":"http://127.0.0.1:3000/assets/images/beer.png","title":"Lunch in Berlin, first day","desc":"Very first lunch in Germany in 2018"}
*/