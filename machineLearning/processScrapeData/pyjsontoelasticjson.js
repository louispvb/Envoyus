var fs = require('fs');
var PythonShell = require('python-shell');

// run this file using `node pyjsontoelasticjson.js` to ge the JSON file in the below form
// { "index": { "_index": "cl", "_type": "listing" }
// {/* Craigslist Listing data */}
// { "index": { "_index": "cl", "_type": "listing" }
// {/* Craigslist Listing data */}

// see link
// https://www.elastic.co/guide/en/elasticsearch/reference/current/docs-bulk.html




var pyoptions = {
  mode: 'text',
  pythonPath: '/usr/local/bin/python3'
  // args: ['value1', 'value2', 'value3']
};

PythonShell.run('craigslistChunker.py', pyoptions, function (err, results) {
  if (err) throw err;
  // results is an array consisting of messages collected during execution
  console.log('results: %j', results);
});



var json = fs.readFileSync('../../craigslistService/macbook-sfbay.json');
json = JSON.parse(json.toString());
// console.log(json)
//{"index":{"_id": String(i)}}) + '\n' +
var newjson = json.map((listing, i) =>
  JSON.stringify({ "index": { "_index": "cl", "_type": "listing" }}) + '\n' + JSON.stringify(listing)).join('\n');

fs.writeFileSync('finalMacBookProSF.json', newjson)
// run curl with file name in terminal
// curl -s -XPOST localhost:9200/_bulk --data-binary @final.json
// curl -XDELETE localhost:9200/cl
