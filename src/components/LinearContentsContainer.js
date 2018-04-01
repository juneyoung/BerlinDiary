import React, { Component } from 'react';
import HorizontalContentsContainer from './HorizontalContentsContainer'; 

export default class LinearContentsContainer extends Component {

	/*
		데이터를 가정한다 .
		seq : 0
		, date : 20180325123000
		, type : 'video/photo'
		, 

	*/

	
	constructor(){
		super();
		this.state = {
			debuggingName : 'linear Post Container'
		}
	}


	render () {

		// 여기서 Linear
		let posts = this.props.posts;
		console.log('Here are the posts :: ', posts);
		window.posts = posts;





		return (
			<div className='linearContentsContainer'>
				<div>
					{
						Object.keys(posts).map((date, i) => {
							console.log(posts[date], i);
							return (
								<HorizontalContentsContainer title={date} data={posts[date]} key={i}/>	
							);
						})
					}
				</div>

			</div>
		)
	}
}