# Elasticsearch Docker Image
## Get started

Machine Learning 
To Run Machine Learning
install python3 
install nltk


to process scraped craiglist data files run 
node --harmony pyjsontoelasticjson.js

line 46 and 66 inside pyjsontoelasticjson.js
var json = fs.readFileSync('../craigslistService/macbook-sfbay-test.json');
fs.writeFileSync('finalMacBookProSF_test.json', finalResult)


tells you the target scrape data and output, the output is eligible for elastic search entry
run the command to post the elastic search database
// curl -s -XPOST localhost:9200/_bulk --data-binary @finalMacBookProSF_test.jsons

