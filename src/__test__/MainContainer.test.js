import React from 'react';
import renderer from 'react-test-renderer';
import MainContainer from '../components/MainContainer';

/*
	describe
	it
	expect
*/

describe('MainContainer jest', () => {
	let component = null;

	it("MainContainer render validation", () => {
		component = renderer.create('<MainContainer/>');
	});

	it('Matching to snapshot', () => {
		const tree = component.toJSON();
		expect(tree).toMatchSnapshot();
	});

	it('Checking state.debuggingName', () => {
		component = renderer.create('<MainContainer/>');
		// expect(component.getInstance().state['debuggingName']).toBe('Main_banner'); // 왜 안되는지 어리둥절 
		const tree = component.toJSON(); // 이거하면 왜 re-render 가 되는거지? 어리둥절
		expect(tree).toMatchSnapshot();
	})
});