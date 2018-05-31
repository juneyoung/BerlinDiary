import React, { Component } from 'react';
import MainBanner from './MainBanner';
import LinearContentsContainer from './LinearContentsContainer'
// import ModalContent from './modal/ModalContent'
import sampleData from '../../assets/data/testData.json';
import ElasticsearchClient from '../../assets/scripts/ElasticsearchClient';

// 여기서 던지는 게 맞을 거 같은데...
import Modal from 'react-modal'
import PostView from './PostView'

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


export default class MainContainer extends Component {
	constructor (props) {
		super(props);
		this.state = {
			debuggingName : 'Main Container Area'
			, data : sampleData
			, modalIsOpen : false
			, modalContent : {}
		}
		this.openModal = this.openModal.bind(this);
    	this.afterOpenModal = this.afterOpenModal.bind(this);
    	this.closeModal = this.closeModal.bind(this);
	}

	regroup = (coll, f) => {
		return coll.reduce(function(acc, x) {
			let k = f(x);
			acc[k] = (acc[k] || []).concat(x);
			return acc;
		}, {});
	}

	listingPosts = () => {
		console.log('listingPosts');
		let ref = this;
		console.log('component did mount called');
		ElasticsearchClient.search({
			index : 'berlin'
			, type: 'post'
			, q: '*:*'
			, sort : "_id:desc"	// : and comma string
		}, function(err, resp) {
			if(err) {
				alert('An Error occurs while fetching data from Elasticsearch!');
				console.error('An error occurs while listing post', err);
			} else {

				function yyyymmdd(date){
					if( typeof date === 'string') {
						return date.substring(0, date.indexOf('T')).replace(/-/g, '');
					}
					var mm = date.getMonth() + 1; // getMonth() is zero-based
					var dd = date.getDate();
					return [ date.getFullYear(), (mm>9 ? '' : '0') + mm, (dd>9 ? '' : '0') + dd ].join('');
				}

				let dataList = resp.hits.hits.map((mem, i) => {
					console.log('_data_id ', mem._id);
					let tempObj = {};
					tempObj.seq = mem._id;
					tempObj.type = 'photo';
					tempObj.mediaUrl = 'http://127.0.0.1:3000/assets/images/afternoon.png';
					tempObj.title = mem._source.title || '';
					tempObj.desc = mem._source.description || '';
					tempObj.date = (!!mem._source.created) ? yyyymmdd(mem._source.created) : yyyymmdd(new Date()); 
					tempObj.created = mem._source.created || '';
					tempObj.changed = mem._source.changed || '';
					return tempObj;
				});

				dataList = ref.regroup(dataList, function(x){ return x.date; })
				// console.log('fetched Data :: ', dataList);
				ref.setState({ data : dataList });
			}
		})
	}

	openModal(data) {
		this.setState({ modalIsOpen: true, modalContent: (data || {}) });
	}

	afterOpenModal() {
		console.log('define something after open modal');
	}

	closeModal() {
		this.setState({modalIsOpen: false, modalContent: {}});
	}

	componentDidMount = () => {
		this.listingPosts();
	}

	componentWillMount () {
		Modal.setAppElement('body');
	}

	render () {
		return (
			<div className='mainContainer'>
				<MainBanner />
				<div className='contentsHolder'>
					<div className='contentBg dimmed'></div>
					<LinearContentsContainer posts={this.state.data} onPostSelect={ this.openModal }/>
				</div>

				<Modal
					isOpen={ this.state.modalIsOpen }
					onAfterOpen={ this.afterOpenModal }
					onRequestClose={ this.closeModal }
					style={ postModalCustomStyles }
					contentLabel="Post Modal"
				>
					<h2 ref={subtitle => this.subtitle = subtitle}>{ this.state.modalContent.title || 'Title is empty' }</h2>
					<PostView data={ this.state.modalContent } closeEvt={ this.closeModal } />
				</Modal>
			</div>
		)
	}
}