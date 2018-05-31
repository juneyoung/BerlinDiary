import React, { Component } from 'react';


export default class ModalContent extends Component {
	
	constructor () {
		super();
		this.state = {
			debuggingName : 'ModalContent'
		}
		this.toggleModal = this.toggleModal.bind(this);
	}

	toggleModal(){
		console.log('Toggling modal');
	}


	render(){
		return (
			<div className='modal'>
				<div className='content'>
					<div className='top'>
						<span className='modalClose'>&times;</span>
					</div>
					<div className='container'>
						<div className='title'>
							{'어쩌구 저쩌구 하였습니다...'}
						</div>
						<div className='media'>
							<img src='assets/images/404.jpg' width='100%' height='auto'></img>
						</div>
						<div className='description'>
							개행이 안되는 걸요 <br/>
							개행이 안되는 걸요 <br/>
							개행이 안되는 걸요 <br/>
							개행이 안되는 걸요 <br/>
							개행이 안되는 걸요 <br/>
							개행이 안되는 걸요 <br/>
							개행이 안되는 걸요 <br/>
							개행이 안되는 걸요 <br/>
							개행이 안되는 걸요 <br/>
							개행이 안되는 걸요 <br/>
							개행이 안되는 걸요 <br/>
							개행이 안되는 걸요 <br/>
							개행이 안되는 걸요 <br/>
							개행이 안되는 걸요 <br/>
							개행이 안되는 걸요 <br/>
							개행이 안되는 걸요 <br/>
							개행이 안되는 걸요 <br/>
							개행이 안되는 걸요 <br/>
							개행이 안되는 걸요 <br/>
							개행이 안되는 걸요 <br/>
							개행이 안되는 걸요 
						</div>
					</div>
				</div>
			</div>
		);
	}
}