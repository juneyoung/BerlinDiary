import React, {Component} from 'react';
import MediaPost from './MediaPost';

export default class MediaSlider extends Component {
	constructor() {
		super();
		console.log('I will do whatever I like damn lint')
	}


	render() {
		// console.log('MediaSlider :: ', this.props);
		let data = this.props.data;
		return (
			<div className='mediaSlider'>
				{
					data.map((post, i) => {
						return (
							<MediaPost data={post} key={i}  onPostSelect={ this.props.onPostSelect }/>
						);	
					})
				}
			</div>
		);
	}
}