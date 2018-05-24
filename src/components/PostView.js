import React, { Component } from 'react';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';


export default class PostView extends Component {
	constructor(props) {
		super(props);
	}

	render () {

		const description = this.props.data.desc || '<div></div>';
		return (<div>

			<div className='postViewContent'>
				{
					ReactHtmlParser(description)
				}
			</div>
		</div>);
	}
}