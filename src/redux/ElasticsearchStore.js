import { createStore } from 'redux';

// const INIT_ES = 'ES_INIT'

function esOps = (state = [], action) {
	switch (action.type) {
		case 'INIT_ES'
			console.log('Initialize Elastissearch');
			return state;
		case 'GET_ESCLIENT'
			console.log('Fetch Elasticsearch Client');
			return state;
		default
			return state;
	}
}

let esStore = createStore(esOps);

esStore.subscribe( () => console.log(esStore.getState()));

esStore.dispatch({ type : 'INIT_ES' });
esStore.dispatch({ type : 'GET_ESCLIENT' });