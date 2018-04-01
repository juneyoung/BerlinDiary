import React, { Component } from 'react';
import MainBanner from './MainBanner';
import LinearContentsContainer from './LinearContentsContainer'

export default class MainContainer extends Component {
	constructor () {
		super();

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
					<div className='contentBg dimmed'></div>
					<LinearContentsContainer posts={this.state.sampleData}/>
				</div>
			</div>
		)
	}
}