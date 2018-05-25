import React, { Component } from 'react';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';


export default class PostView extends Component {
	constructor(props) {
		super(props);
	}

	formatDateValues (dateStr){
		let formated = dateStr;
		if(dateStr.indexOf('T') > -1) {
			formated = dateStr.replace('T', ' ');
		}
		formated = formated.substring(0, formated.lastIndexOf('.'));
		return formated;
	}

	render () {
		// console.log('on PostView :: ', this.props.data)
		let data = this.props.data || {};
		const description = data.desc || '<div></div>';
		return Object.keys(data).length > 0 ? (<div>
			<div className='postViewDate'> 
				<p>
					<small>{ this.formatDateValues(data.created) }</small>
				</p>
			</div>
			<div className='postViewContent'>
				{
					ReactHtmlParser(description)
				}
			</div>
		</div>) : null;
	}
}