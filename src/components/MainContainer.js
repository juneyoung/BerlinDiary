import React, { Component } from 'react';
import MainBanner from './MainBanner';
import LinearContentsContainer from './LinearContentsContainer'

export default class MainContainer extends Component {
	constructor () {
		super();


		let sampleData = {
			20180325 : [
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
			],
			20180326 : [
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
			]
		};


		this.state = {
			debuggingName : 'Main Container Area'
			, sampleData : sampleData
		}

	}

	render () {
		return (
			<div className='mainContainer'>
				<MainBanner />
				<div className='contentsHolder'>
					<LinearContentsContainer posts={this.state.sampleData}/>
				</div>
			</div>
		)
	}
}