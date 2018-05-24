import React, { Component } from 'react';
import ElasticsearchClient from '../../assets/scripts/ElasticsearchClient.js';
import PostForm from './PostForm.js';
import Modal from 'react-modal'

const postModalCustomStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    width				  : '80%'	
  }
};

export default class PostList extends Component {


	constructor () {
		super();
		console.log('Post List Constructor');
		this.state = {
			componentName : 'Post List From Elasticsearch'
			, postList : []
			, modalIsOpen : false
			, modalContent : {}
		}

		this.openModal = this.openModal.bind(this);
    	this.afterOpenModal = this.afterOpenModal.bind(this);
    	this.closeModal = this.closeModal.bind(this);
    	this.listingPosts = this.listingPosts.bind(this);
	}

	listingPosts (closeModal) {
		console.log('listingPosts :: ', arguments);
		let ref = this;
		console.log('component did mount called');
		ElasticsearchClient.search({
			index : 'berlin'
			, type: 'post'
			, q: '*:*'
			, sort : "_id:desc"	// : and comma string
		}, function(err, resp) {
			if(err) {
				console.error('An error occurs while listing post', err);
			} else {
				console.log('Successfully list an index - post', resp.hits.hits);
				if(resp.hits.hits){
					if(closeModal) {
						ref.setState({ postList : resp.hits.hits, modalIsOpen : false, modalContent: {} })
					} else {
						ref.setState({ postList : resp.hits.hits })
					}
				}
			}
		})
	}

	openModal() {
		this.setState({modalIsOpen: true});
	}

	afterOpenModal() {
		// references are now sync'd and can be accessed.
		// this.subtitle.style.color = '#f00';
	}

	closeModal() {
		this.setState({modalIsOpen: false, modalContent: {}});
		// 여기서 뭘 해줘야 됨???
	}

	componentDidMount () {
		this.listingPosts();
	}

	componentWillMount () {
		Modal.setAppElement('body');
	}

	onPostClick = (mem) => {
		console.log('on Post Click :: ', mem);
		// saveForm 을 display:none 으로 가지고 있다가 클릭시 데이터를 넘겨주자
		this.setState({ modalContent : mem }) 
		this.openModal();
	}

	onModalFinish = () => {
		this.listingPosts(true);
	}

	createPost = () => {
		this.openModal();
	}


	render () {
		let ref = this;
		let items = this.state.postList.map((mem, i) => {
			return (
				<div key={i} className='tr'>
					<div className='td'> { mem._id } </div>
					<div className='td'><a href='#' onClick= { ref.onPostClick.bind(ref, mem) } > { mem._source.title } </a></div>
					<div className='td'> { mem._source.created } </div>
					<div className='td'> { mem._source.changed } </div>
				</div>);
		});
		let isUpdate = Object.keys(this.state.modalContent).length > 1;

		return (
			<div id='AdminContents'>
				<div className='postList table'>
					<div className='th'>
						<div className='td' >Sequence</div>
						<div className='td' >Title</div>
						<div className='td' >Created</div>
						<div className='td' >Modified</div>
					</div>
					{ items }
				</div> <br/>
				<div>
					<button type='button' onClick={ this.createPost } >Create Post</button>
				</div>

				<Modal
					isOpen={ this.state.modalIsOpen }
					onAfterOpen={ this.afterOpenModal }
					onRequestClose={ this.closeModal }
					style={ postModalCustomStyles }
					contentLabel="Post Modal"
				>
					<h2 ref={subtitle => this.subtitle = subtitle}>{ isUpdate ? 'Update Post' : 'Create Post' }</h2>
						<PostForm data={ this.state.modalContent } isUpdate={ isUpdate } closeEvt={ this.closeModal } onFinish={ this.onModalFinish }/>
					</Modal>
			</div>
		);
	}	
} 