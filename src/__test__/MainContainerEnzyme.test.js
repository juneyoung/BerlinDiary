import React from 'react';
import { shallow } from 'enzyme';
import MainContainer from '../components/MainContainer';

/*
	describe
	it
	expect
*/

describe('MainContainer jest', () => {
	let component = null;

	it("MainContainer render validation", () => {
		// enzyme 은 쿼테이션으로 싸면 오류남 > Invariant Violation: ReactShallowRenderer render(): Invalid component element
		// component = shallow('<MainContainer/>');
		component = shallow(<MainContainer/>);
	});

	// it('Checking Initial snapshot', () => {
	// 	const tree = component.toJSON();
	// 	expect(tree).toMatchSnapshot();
	// });

	it('Matching to snapshot', () => {
		expect(component).toMatchSnapshot();
	});
});