import React, { Component } from 'react';
import ElasticsearchClient from '../../assets/scripts/ElasticsearchClient.js';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { Editor } from 'react-draft-wysiwyg';
import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import Dropbox from 'dropbox';
import apiKeys from '../../assets/secrets/keys.json';

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

	onEditorStateChange: Function = (editorState) => {
		this.setState({
			editorState : editorState
		});
	};

	uploadImageCallBack(file) {

		let dbx = this.state.dropbox;
        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        // if (month.length < 2) month = '0' + month; 
        // if (day.length < 2) day = '0' + day;

        let fileInfo = {
        	path: '/' + [ year, ( month > 9 ? '' : '0' ) + month, ( day > 9 ? '' : '0' ) + day ].join('') +  '/' + file.name
        	, contents : file
        }

        // dropBox API 로 파일 업데이트를 하자 
        // DropBox 는 절대적으로 Promise 를 반환해야 함 - 구린데??
        return new Promise(
            (resolve, reject) => {
    	        dbx.filesUpload(fileInfo)
				.then(function(response) {
					console.log('dropbox Save success :: ', response, dbx);
					// resolve({ data: {link: response.path_display}})
					// 리소스 호출 URL 만들기가 어려움 ... ajax 에서 ajax 또 호출할 것도 아니고 그냥 data 스트림으로 처리하는 게 나을 듯 
					resolve({ data: {link: 'https://www.dropbox.com/preview/앱/Berlin2018/' + encodeURI(response.path_display) }})
				})
				.catch(function(error) {
					console.error('dropbox Save error :: ', error);
					reject(error);
		        });
            }
        );
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