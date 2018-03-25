import React, { Component } from 'react'

export default class HorizontalContentsContainer extends Component {
	
	constructor () {
		super();
		this.state = {

		}
	}

	render () {

		console.log(this.props);
		let horizontalTitle = this.props.title;
		let posts = this.props.data;

		return (
			<div className='horizontalContents'>
				<div className='table_row'>
					<div className='table_cell dateTitle'> 
						{ horizontalTitle } 
					</div>
					<div className='table_cell'>
						{
							posts.map((post, i) => {
								return (
									<div key={i}>
										<div>
											{ post.date }
										</div>
										<div>
											{ JSON.stringify(post) }
										</div>
									</div>
								);	
							})
						}
					</div>
			
				</div>
			</div>
		);
	}
}