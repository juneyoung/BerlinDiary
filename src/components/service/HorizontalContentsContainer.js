import React, { Component } from 'react';
import MediaSlider from './MediaSlider';

export default class HorizontalContentsContainer extends Component {
	
	constructor () {
		super();
		this.state = {

		}
	}

	render () {

		// console.log('HorizontalContentsContainer', this.props);
		let horizontalTitle = this.props.title;
		let posts = this.props.data;

		return (
			<div className='horizontalContents'>
				<div className='table_row'>
					<div className='table_cell cellTitle'> 
						{ horizontalTitle.substring(4, 6) }.{horizontalTitle.substring(6, 8)} <br/>
						{ horizontalTitle.substring(0, 4) }
					</div>
					<div className='table_cell cellContents'>
						<MediaSlider data={posts}  onPostSelect={ this.props.onPostSelect }/>
					</div>
				</div>
			</div>
		);
	}
}