import React, { Component } from 'react';
import MainBanner from './MainBanner';
import LinearContentsContainer from './LinearContentsContainer'
import ModalContent from './modal/ModalContent'
import Dropbox from 'dropbox';
import sampleData from '../assets/data/testData.json';
import ElasticsearchClient from '../assets/scripts/ElasticsearchClient';

export default class MainContainer extends Component {
	constructor (props) {
		super(props);

		let dropbox = null;
		try {
			let dropBoxInfo = this.props.apiKeys.filter(mem => {
				return mem.vendor === 'dropbox';
			})
			console.log('dropBoxInfo :: ', dropBoxInfo);
			dropbox = new Dropbox.Dropbox({ accessToken:  dropBoxInfo[0].accessToken });
		} catch(dropboxException) {
			console.error('An Error Occurs while initialize Dropbox. set dropbox variable as null :: ', dropboxException);
		}
		
		this.state = {
			debuggingName : 'Main Container Area'
			, data : sampleData
			, dropbox : dropbox
		}
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
					let tempObj = new Object();
					tempObj.seq = mem._id;
					tempObj.type = 'photo';
					tempObj.mediaUrl = 'http://127.0.0.1:3000/assets/images/afternoon.png';
					tempObj.title = mem._source.title || '';
					tempObj.desc = mem._source.description || '';
					tempObj.date = (!!mem._source.created) ? yyyymmdd(mem._source.created) : yyyymmdd(new Date()); 
					return tempObj;
				});

				dataList = ref.regroup(dataList, function(x){ return x.date; })
				// console.log('fetched Data :: ', dataList);
				ref.setState({ data : dataList });
			}
		})
	}


	componentDidMount = () => {
		this.listingPosts();
	}


	render () {
		return (
			<div className='mainContainer'>
				{/* <ModalContent/> */}
				<MainBanner />
				<div className='contentsHolder'>
					<div className='contentBg dimmed'></div>
					<LinearContentsContainer posts={this.state.data}/>
				</div>
			</div>
		)
	}
}