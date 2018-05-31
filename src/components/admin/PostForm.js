import React, { Component } from 'react';
import ElasticsearchClient from '../../assets/scripts/ElasticsearchClient.js';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { Editor } from 'react-draft-wysiwyg';
import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import Dropbox from 'dropbox';
import apiKeys from '../../assets/secrets/keys.json';
import picasa from '../../assets/scripts/Picasa.js'

export default class PostForm extends Component {
	
	constructor(props) {
		super(props);
		const description = (this.props.data._source || {}).description || '';
		const constBlock = htmlToDraft(description);
		let editorState = EditorState.createWithContent(ContentState.createFromBlockArray(constBlock.contentBlocks));

		// editorState = EditorState.createEmpty();
		let dropbox = null;
		try {
			let dropBoxInfo = apiKeys.filter(mem => {
				return mem.vendor === 'dropbox';
			})
			console.log('dropBoxInfo :: ', dropBoxInfo);
			dropbox = new Dropbox.Dropbox({ accessToken:  dropBoxInfo[0].accessToken });
		} catch(dropboxException) {
			console.error('An Error Occurs while initialize Dropbox. set dropbox variable as null :: ', dropboxException);
		}

		
		this.state = {
			componentName : 'ModalPostForm'
			, editorState: editorState
			, dropbox: dropbox
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
		// let source = this.props.data._source || {};
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

	onEditorStateChange: Function = (editorState) => {
		this.setState({
			editorState : editorState
		});
	};

	uploadImageCallBack(file) {

        window.picasa = picasa;
        console.log('PICASA PICASA PICASA PICASA PICASA ', picasa);

		let userId = '318005977835-rdst8ad0337eoc1q6edpu7umsh2e9767.apps.googleusercontent.com';
        let albumId = 'AF1QipMXxVpYuYTe2HsdQztNw5v3rj0zPvDpElIKmmKu';
		// let requestUrl = 'https://picasaweb.google.com/data/feed/api/user/' + userId + '/albumid/' + albumId;
		let picasaConfig = {
			clientId : "318005977835-rdst8ad0337eoc1q6edpu7umsh2e9767.apps.googleusercontent.com"
			, clientSecret : "Vexq-B3W-VJot-Gvl5eCdoHT"
			, redirectURI : "http://127.0.0.1:3000"
		};

		const authURL = picasa.getAuthURL(picasaConfig, (err, resp) => {

			console.log('authURL :: ', err, resp);
		});
		console.log('google Auth URL :: ', authURL);
		let code = '4/AAAuKuBy_AG2oa_5HkEOP3Mhob7j5YYqfhTzPpA0AE-1AYiv4sb7OXjc6i03R4KkM2EbSFYYaJVvKPRP3-l2iNU#';
		let accessToken = picasa.getAccessToken(picasaConfig, code, (err, resp) => {
			console.log('getAccessToken :: ', err, resp);
		})
		console.log('accessToken :: ', accessToken);

		
		// let fileInfo = {
		// 	title       : file.name
		//     , summary     : file.name
		//     , contentType : 'image/jpeg'
		//     , binary      : file
		// }

		// let accessToken = '';

		// picasa.postPhoto(code, albumId, fileInfo, (err, resp) => {
		// 	console.log(err, resp);
		// });

    }


	render () {


		// https://github.com/jpuri/react-draft-wysiwyg/issues/445
        const toolbar = {
            image: { uploadCallback: this.uploadImageCallBack.bind(this), alt: { present: true, mandatory: true } },
        };



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
					{/*<textarea name='description' placeholder='Wrting contents...' defaultValue={ sourceDate.description || '' } /> */}
					<Editor
					  editorState={ this.state.editorState }
					  toolbarClassName="toolbarClassName"
					  wrapperClassName="wrapperClassName"
					  editorClassName="editorClassName"
					  toolbar={ toolbar }
					  onEditorStateChange={ this.onEditorStateChange }
					/>
					<textarea name='description' disabled style={{ display : 'none' }} value={draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))} />
				</form>
			</div>
			<div>
				<button onClick={ this.sendSaveRequest }>Save</button>
				<button onClick={ this.props.closeEvt }>close</button>
			</div>	
		</div>);
	}
}