import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import modules from './modules';


/*
	원본 
const configure = () => {
	const store = createStore(modules, composeWithDevTools(applyMiddleware(thunkMiddleware)));
	return store();
}

export default configure; 
*/

// 바로 실행하면 안되나요?
const configure = () => {
	const store = createStore(modules, composeWithDevTools(applyMiddleware(thunkMiddleware)));
	return store;
};

export default configure; 