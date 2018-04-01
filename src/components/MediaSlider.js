import React, {Component} from 'react';
import MediaPost from './MediaPost';

export default class MediaSlider extends Component {
	constructor() {
		super();
	}


	render() {

		let data = this.props.data;
		return (
			<div className='mediaSlider'>
				{
					data.map((post, i) => {
						return (
							<MediaPost data={post} key={i}/>
						);	
					})
				}
			</div>
		);
	}
}