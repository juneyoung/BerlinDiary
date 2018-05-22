import React, { Component } from 'react';
import ElasticsearchClient from '../../assets/scripts/ElasticsearchClient.js';

export default class PostList extends Component {


	constructor () {
		super();
		console.log('Post List Constructor');
		this.state = {
			componentName : 'Post List From Elasticsearch'
			, postList : []
		}
	}

	componentDidMount () {
		let ref = this;
		console.log('component did mount called');
		ElasticsearchClient.search({
			index : 'post'
			, q: '*:*'
			// , sort : "created:desc"
		}, function(err, resp) {
			if(err) {
				console.error('An error occurs while listing post', err);
			} else {
				console.log('Successfully list an index - post', resp.hits.hits);
				if(resp.hits.hits){
					ref.setState({ postList : resp.hits.hits })
				}
			}
		})
	}


	onPostClick = (id) => {
		console.log('on Post Click :: ', id);
	}

	render () {
		let ref = this;
		let items = this.state.postList.map((mem, i) => {
			return (
				<div key={i} className='tr'>
					<div className='td'> { mem._id } </div>
					<div className='td'><a href='#' onClick= { ref.onPostClick.bind(ref, mem._id) } > { mem._source.title } </a></div>
					<div className='td'> { mem._source.created } </div>
					<div className='td'> { mem._source.changed } </div>
				</div>);
		})

		return (
			<div className='postList table'>
				<div className='th'>
					<div className='td' >Sequence</div>
					<div className='td' >Title</div>
					<div className='td' >Created</div>
					<div className='td' >Modified</div>
				</div>
				{ items }
			</div>
		);
	}
	
} 