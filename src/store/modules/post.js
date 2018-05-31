import { createAction, handleActions } from 'redux-actions';
import ElasticsearchClient from '../../assets/scripts/ElasticsearchClient';
// import '../../assets/scripts/common.js';


// 액션 타입을 정의해줍니다.
const LIST = 'post/LIST';
const SVC_LIST = 'post/SVC_LIST';

// 액션 생성 함수를 만듭니다.
export const list = createAction(LIST);
const initialState = {
    keyword: '',
    data: [],
    postList: []
}

/*
=================================================================================
=================================================================================
======================== ElasticOperations Start ================================
=================================================================================
=================================================================================
*/
let regroup = (coll, f) => {
    return coll.reduce(function(acc, x) {
        let k = f(x);
        acc[k] = (acc[k] || []).concat(x);
        return acc;
    }, {});
}

let yyyymmdd = (date) => {
    if( typeof date === 'string') {
        return date.substring(0, date.indexOf('T')).replace(/-/g, '');
    }
    var mm = date.getMonth() + 1; // getMonth() is zero-based
    var dd = date.getDate();
    return [ date.getFullYear(), (mm>9 ? '' : '0') + mm, (dd>9 ? '' : '0') + dd ].join('');
}

let formatList = (originalList) => {
    let formatedList = originalList.map((mem, i) => {
        console.log('_data_id ', mem._id);
        let tempObj = {}; // I do not think "{}" is better than "new Object()". WTF lint...
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
    formatedList = regroup(formatedList, function(x){ return x.date; });
    return formatedList;
}

async function listElastic () {
    console.log('listingPosts');
    console.log('component did mount called');
    const resp = await ElasticsearchClient.search({
        index : 'berlin'
        , type: 'post'
        , q: '*:*'
        , sort : "_id:desc" // : and comma string
    });
    return resp;
}


/*
=================================================================================
=================================================================================
======================== ElasticOperations Ends =================================
=================================================================================
=================================================================================
*/

function postApi(url, data){
    console.log('Executing POST API...', arguments);
    /*
        url 이나 data 에 따라 어떤 엘라스틱 처리를 할지 분기 
    */
    return listElastic(); // Promise 반환 
}


async function fetchList(dispatch){
    const res = await postApi('http://localhost:8080/api/jpa/list');
    dispatch({type: LIST, payload: res});
}

export const getList = () => async (dispatch) => {
    console.log('getList');
    await fetchList(dispatch);
}


export default handleActions({
    [LIST]: (state, {payload : res}) => {
        console.log('in Reducer :: ', arguments);
        let postList = (res.hits || {}).hits || [];
        console.log('LIST Reducer list :: ', postList);
        return Object.assign( {}, state, { postList : postList } );
    },
    [SVC_LIST]: (state, {payload : res}) => {
        let postList = (res.hits || {}).hits || [];
        let formatedList = formatList(postList);
        console.log('SVC_LIST Reducer list :: ', formatedList);
        return Object.assign( {}, state, { postList : formatedList } );
    }
}, initialState);
