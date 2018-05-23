import React, { Component } from 'react';
import ElasticsearchClient from '../../assets/scripts/ElasticsearchClient.js';

export default class PostForm extends Component {
	
	constructor() {
		super();
		this.state = {
			componentName : 'ModalPostForm'
		}
		this.static = {
			postForm : null
		}
		this.sendSaveRequest = this.sendSaveRequest.bind(this);
	}

	sendSaveRequest(){
		// ElasticsearchClient.
		if(!this.static.postForm) {
			alert('Nothing to save!');
			return;
		} else {
			console.log('postForm?', this.static.postForm);
		}

		let body = {}; 
		let ref = this;
		this.static.postForm.querySelectorAll('input, textarea').forEach( mem => {
			body[mem.name] = mem.value;
		});

		console.log('body data :: ', body);

		let param = {
			index : 'berlin'
			, type : 'post'
			, body : {
				doc : null
			}
		}
		let source = this.props.data._source || {};
		let isUpdate = this.props.isUpdate || false;
		if(isUpdate) {
			param = Object.assign(param, { id : this.props.data._id });
		} else {
			body['created'] = new Date();
			body['changed'] = new Date();
		}

		param = Object.assign(param, { body : body });
		console.log('Final Data Before Save', param);
		ElasticsearchClient.index(param, function(err, response) {
			if(err) {
				alert('Error happend while store data to Elasticsearch');
				console.error('Elasticsearch save Err :: ', err);
				ref.props.onFinish();
			} else {
				alert('Data Saved Successfully');
				console.log('Successful Elasticsearch save :: ', response, ref.props);
				ref.props.onFinish();
			}
		})
	}

	render () {

		let sourceDate = this.props.data._source || {};
		let isUpdate = this.props.isUpdate;
		let dateFields = isUpdate ? (<div>
					<input name='created' disabled='true' defaultValue={ sourceDate.created || '' } />
					<input name='changed' disabled='true' defaultValue={ sourceDate.changed || '' } />
				</div>) : null;

		return (
		<div>
			<div>
				<form name='postForm' ref={el => { this.static.postForm = el; } }>
					<input name='title' placeholder='Insert Title' defaultValue={ sourceDate.title || '' }/>
					{ dateFields }
					<textarea name='description' defaultValue={ sourceDate.description || 'Write post' } />		
				</form>
			</div>
			<div>
				<button onClick={ this.sendSaveRequest }>Save</button>
				<button onClick={ this.props.closeEvt }>close</button>
			</div>	
		</div>);
	}
}