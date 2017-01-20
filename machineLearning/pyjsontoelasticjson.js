var fs = require('fs');
var PythonShell = require('python-shell');
var Promise = require('bluebird');

var pyrun = Promise.promisify(PythonShell.run);
// see link
// https://www.elastic.co/guide/en/elasticsearch/reference/current/docs-bulk.html

var specWeCareAbout = ['Processor', 'Hard Drive', 'RAM', 'Graphics', 'Screen Size', 'Year']
var relevantSpec = (spec)=> (specWeCareAbout.includes(spec))
var machineLearnListing = async function(inputStr) {
  // var listing = "\n         \n13\" MacBook Pro  \n2.5 GHz Core i5 (Mid 2012) Processor  \n500 GB Hard Drive  \n4 GB Ram  \nAlmost perfect condition. No scratches, dents or blemishes. Has had overlay case and screen protector since day one. Comes with original box and power supply.    "
  var pyoptions = {
    mode: 'text',
    pythonPath: '/usr/local/bin/python3',
    args: [inputStr]
  }
  var results
  try {
    results = await pyrun('craigslistChunker.py', pyoptions);
  } catch (err) {
    console.error(err);
  }
  // console.log(results)
  results = results.map(spec=>JSON.parse(spec))
  var specObj = results.reduce((accumulator, current)=>{
    current[1].forEach(spec=>{
      if (relevantSpec(spec[0]) && spec[1] > 0.94) {
        if(!accumulator.hasOwnProperty(spec[0])) {
          accumulator[spec[0]] = []
        } 
        accumulator[spec[0]].push(current[0])
      } else if (!Number.isNaN(Number(spec[0]))) {
        accumulator.condition.push([spec[0],spec[1]])
      }
    })
    return accumulator
  }, {
    condition: []
  })
  specWeCareAbout.forEach(spec=>{
    if (!specObj.hasOwnProperty(spec)) {
      specObj[spec] = []
      specObj[spec].push("")
    }
  })
  var conditionCounter = 0
  specObj.condition = Math.round(specObj.condition.reduce((accumulator, current)=>{
    if (current[1] > 0.8) {
      accumulator+=Number(current[0]);
      conditionCounter+=1
    }
    return accumulator;
  }, 0) / conditionCounter)
  if (conditionCounter === 0) {
    specObj.condition = 'Unavailable'
  }
  console.log('specObj:', specObj)
  return specObj
}

var json = fs.readFileSync('../craigslistService/macbook-sfbay-test.json');
json = JSON.parse(json.toString());
(async () => {
  let length = json.length
  let result = '';
  let progress = 0
  for (let i = 0; i < length; i++) {
    let listing = json[i];
    let output = await machineLearnListing(listing.description)
    // console.log(output)
    listing.specs = output
    listing.condition = output.condition
    console.log(listing.condition)
    let str = JSON.stringify({ "index": { "_index": "cl", "_type": "listing" }}) + '\n' + JSON.stringify(listing);
    result += str + '\n'
    let completionPercent = Math.floor(i / length * 100)
    if (completionPercent > progress) {
      console.log(completionPercent, "% Done");
      progress = completionPercent;
    }
  }
  return result;
})().then(finalResult => {
  fs.writeFileSync('finalMacBookProSF_test.json', finalResult)
}).catch(err => {
  console.log(err)
})

// var newjson = json.map((listing, i) => {
//   return machineLearnListing(listing.description).then(output => {

//     listing.specs = output
//     // console.lo?(output)
//     return JSON.stringify({ "index": { "_index": "cl", "_type": "listing" }}) + '\n' + JSON.stringify(listing)
//   })
// })

// Promise.all(newjson).then(result => {
//   fs.writeFileSync('finalMacBookProSF_test.json', result.join('\n'))
// })

// run curl with file name in terminal
// curl -s -XPOST localhost:9200/_bulk --data-binary @final.json
// curl -XDELETE localhost:9200/cl
