import React, { Component } from 'react';

export default class MainBanner extends React.Component {
	
	constructor() {
		super();
		this.state = {
			debuggingName : 'Main_Banner'
		}
	}

	render () {
		return (
			<div class='mainBanner'>
				<div class='titleHolder'>
					이미지이거나 텍스트 - 印象柏林
				</div>
				<div class='info_float'>
					github logos <br/>
					Social Connections 
				</div>
			</div>
		)
	}
}