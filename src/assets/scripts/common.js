/*
Javascript Collection Regroup
*/
function regroup (coll, f) {
    return coll.reduce(function(acc, x) {
        let k = f(x);
        acc[k] = (acc[k] || []).concat(x);
        return acc;
    }, {});
}

/*
get yyyymmdd dateformatString
*/
function yyyymmdd (date) {
    if( typeof date === 'string') {
        return date.substring(0, date.indexOf('T')).replace(/-/g, '');
    }
    let mm = date.getMonth() + 1; // getMonth() is zero-based
    let dd = date.getDate();
    return [ date.getFullYear(), (mm>9 ? '' : '0') + mm, (dd>9 ? '' : '0') + dd ].join('');
}