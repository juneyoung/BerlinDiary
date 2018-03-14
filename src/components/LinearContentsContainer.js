import React, { Component } from 'react';


export default class LinearContentsContainer extends Component {
	
	constructor(){
		super();
		this.state = {
			debuggingName : 'linear Post Container'
		}
	}


	render () {

		// 여기서 Linear

		return (
			<div>
				<p>{this.state.debuggingName}</p>
			</div>
		)
	}
}