import React, { Component } from 'react';
import MainBanner from './MainBanner';
import LinearContentsContainer from './LinearContentsContainer'
import ModalContent from './modal/ModalContent'
import Dropbox from 'dropbox';

export default class MainContainer extends Component {
	constructor (props) {
		super(props);

		let sampleData = {

			20180630 : [
				{
					seq : 0
					, date : 20180330063000
					, type : 'photo'
					, mediaUrl : 'http://127.0.0.1:3000/assets/media/morning.mp4'
					, title : 'Morning Impression of Berlin'
					, desc : 'Good morning, Berlin!'
				}
				, {
					seq : 1
					, date : 20180330123000
					, type : 'photo'
					, mediaUrl : 'http://127.0.0.1:3000/assets/images/afternoon.png'
					, title : 'Lunch in Berlin, second day'
					, desc : 'Blah Blah Blah Blah Blah Blah Blah'
				}
				, {
					seq : 2
					, date : 20180330123000
					, type : 'photo'
					, mediaUrl : 'http://127.0.0.1:3000/assets/images/afternoon.png'
					, title : 'Lunch in Berlin, second day'
					, desc : 'Blah Blah Blah Blah Blah Blah Blah'
				}
				, {
					seq : 3
					, date : 20180330123000
					, type : 'photo'
					, mediaUrl : 'http://127.0.0.1:3000/assets/images/afternoon.png'
					, title : 'Lunch in Berlin, second day'
					, desc : 'Blah Blah Blah Blah Blah Blah Blah'
				}
				, {
					seq : 4
					, date : 20180330123000
					, type : 'photo'
					, mediaUrl : 'http://127.0.0.1:3000/assets/images/afternoon.png'
					, title : 'Lunch in Berlin, second day'
					, desc : 'Blah Blah Blah Blah Blah Blah Blah'
				}
				, {
					seq : 5
					, date : 20180330123000
					, type : 'photo'
					, mediaUrl : 'http://127.0.0.1:3000/assets/images/afternoon.png'
					, title : 'Lunch in Berlin, second day'
					, desc : 'Blah Blah Blah Blah Blah Blah Blah'
				}
			], 
			20180629 : [
				{
					seq : 0
					, date : 20180329063000
					, type : 'photo'
					, mediaUrl : 'http://127.0.0.1:3000/assets/media/morning.mp4'
					, title : 'Morning Impression of Berlin'
					, desc : 'Good morning, Berlin!'
				}
				, {
					seq : 1
					, date : 20180329123000
					, type : 'photo'
					, mediaUrl : 'http://127.0.0.1:3000/assets/images/afternoon.png'
					, title : 'Lunch in Berlin, second day'
					, desc : 'Blah Blah Blah Blah Blah Blah Blah'
				}
			],
			20180628 : [
				{
					seq : 0
					, date : 20180328063000
					, type : 'photo'
					, mediaUrl : 'http://127.0.0.1:3000/assets/media/morning.mp4'
					, title : 'Morning Impression of Berlin'
					, desc : 'Good morning, Berlin!'
				}
				, {
					seq : 1
					, date : 20180328123000
					, type : 'photo'
					, mediaUrl : 'http://127.0.0.1:3000/assets/images/afternoon.png'
					, title : 'Lunch in Berlin, second day'
					, desc : 'Blah Blah Blah Blah Blah Blah Blah'
				}
			],
			20180627 : [
				{
					seq : 0
					, date : 20180327063000
					, type : 'photo'
					, mediaUrl : 'http://127.0.0.1:3000/assets/media/morning.mp4'
					, title : 'Morning Impression of Berlin'
					, desc : 'Good morning, Berlin!'
				}
				, {
					seq : 1
					, date : 20180327123000
					, type : 'photo'
					, mediaUrl : 'http://127.0.0.1:3000/assets/images/afternoon.png'
					, title : 'Lunch in Berlin, second day'
					, desc : 'Blah Blah Blah Blah Blah Blah Blah'
				}
			],
			20180626 : [
				{
					seq : 0
					, date : 20180326063000
					, type : 'photo'
					, mediaUrl : 'http://127.0.0.1:3000/assets/media/morning.mp4'
					, title : 'Morning Impression of Berlin'
					, desc : 'Good morning, Berlin!'
				}
				, {
					seq : 1
					, date : 20180325123000
					, type : 'photo'
					, mediaUrl : 'http://127.0.0.1:3000/assets/images/afternoon.png'
					, title : 'Lunch in Berlin, second day'
					, desc : 'Blah Blah Blah Blah Blah Blah Blah'
				}
			],

			20180625 : [
				{
					seq : 0
					, date : 20180325083000
					, type : 'video'
					, mediaUrl : 'http://127.0.0.1:3000/assets/media/dock.mp4'
					, title : 'Arrived in Berlin International airport'
					, desc : 'Arrived in Berlin. Begin life as Berliner'
				}
				, {
					seq : 1
					, date : 20180325123000
					, type : 'photo'
					, mediaUrl : 'http://127.0.0.1:3000/assets/images/beer.png'
					, title : 'Lunch in Berlin, first day'
					, desc : 'Very first lunch in Germany in 2018'
				}
			]
		};


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
			, sampleData : sampleData
			, dropbox : dropbox
		}
	}

	/*
		// ajax recursive 는 어떻게 처리해야 할까...
		listRecursiveDropboxFiles = (path, func) => {
			path = path || '';
			console.log('listing dropboxFiles path :: ', path);
			this.state.dropbox.filesListFolder({path: path})
			  .then(function(response) {
			    console.log('data fetched from dropbox successfully :: ', response.entries);
			    var entries = response.entries || [];
			    for(idx in entries) {
			    	let entry = entries[idx];
			    	if(entry['.tag'] === 'folder') {
			    		path_lower: "/0625"
			    	}
			    }
			  })
			  .catch(function(error) {
			    console.log(error);
			});
		}
	*/

	regroup = (coll, f) => {
		return coll.reduce(function(acc, x) {
			let k = f(x);
			acc[k] = (acc[k] || []).concat(x);
			return acc;
		}, {});
	}


	componentDidMount = () => {
		let currentThis = this;
		if(!! this.state.dropbox) {
			console.log('on ComponentDidMount !!');
			this.state.dropbox.filesListFolder({path: '', recursive: true})
			  .then(function(response) {
			    console.log('data fetched from dropbox successfully :: ', response.entries);
			    let entries = response.entries || [];
			    let distinguished = currentThis.regroup(entries, (x) => { return x['.tag']; });
			    console.log('distinguished Entries :: ', distinguished);
			    window.d = distinguished;

			    console.log('#0. distinguished folder :: ', distinguished.folder)
			    let folders = distinguished.folder;
			    let files = distinguished.file;
			    console.log('#0. distinguished file :: ', files)
			    let tempData = currentThis.regroup(folders, (x) => { return x['name'] });
			    console.log('#1.  tempData :: ', tempData);
			    for (let date of Object.keys(tempData)) {
			    	console.log('#2.  tempData-date :: ', date);
			    	let dateElement = tempData[date][0] || {};
			    	files.forEach(memFile => {
			    		console.log('#3. memFile :: ', memFile);
			    		console.log('#4. tempData :: ', tempData);
			    		if(memFile['path_lower'].indexOf(date) > -1) {
			    			let testTemp = Object.assign({}, memFile);
			    			/*
								엘리먼트 맞춰줘야 데이터 제대로 나오겠다...
			    			*/
			    			dateElement['items'] = dateElement['items'] || [];
			    			dateElement['items'] = dateElement['items'].concat(memFile);
			    		}
			    	});
			    }
			    console.log('regrouped Data Array :: ', JSON.stringify(tempData));
			    // currentThis.setState({ sampleData :  tempData });
			  })
			  .catch(function(error) {
			    console.log(error);
			});	
		} else {
			console.log('Dropbox data is null');
		}
	}


	render () {
		return (
			<div className='mainContainer'>
				{/* <ModalContent/> */}
				<MainBanner />
				<div className='contentsHolder'>
					<div className='contentBg dimmed'></div>
					<LinearContentsContainer posts={this.state.sampleData}/>
				</div>
			</div>
		)
	}
}