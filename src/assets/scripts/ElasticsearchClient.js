let elasticsearch = require('elasticsearch');
let ElasticsearchClient = new elasticsearch.Client({
	host: '127.0.0.1:9200'
	, log : 'trace'
});

module.exports = ElasticsearchClient;