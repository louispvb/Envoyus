var fs = require('fs');
var PythonShell = require('python-shell');
var Promise = require('bluebird');
var argv = require('yargs').argv;

var pyrun = Promise.promisify(PythonShell.run);
// see link
// https://www.elastic.co/guide/en/elasticsearch/reference/current/docs-bulk.html

let convertNumber = x => {
  let numberTry = Number(x)
  return Number.isNaN(numberTry) ? null : numberTry;
}

var specWeCareAbout = ['Processor', 'Hard Drive', 'RAM', 'Graphics', 'Screen Size', 'Year']
var relevantSpec = (spec)=> (specWeCareAbout.includes(spec))
var machineLearnListing = async function(inputStr) {
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
  if (!results) return;
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
var json = fs.readFileSync(argv.in);
json = JSON.parse(json.toString());
(async () => {
  let length = json.length
  let progress = 0
  for (let i = 0; i < length; i++) {
    let listing = json[i];
    let output = await machineLearnListing(listing.description)
    // console.log(output)
    listing.specs = output
    if (!output) continue;
    listing.condition = output.condition

    listing.price = convertNumber(listing.price);
    let lat = convertNumber(listing.lat);
    let lon = convertNumber(listing.lng);
    delete listing.lat;
    delete listing.lng;
    listing.location = { lat, lon }
    // console.log(listing.condition)
    let str = JSON.stringify({ "index": { "_index": "cl", "_type": "listing" }}) + '\n' + JSON.stringify(listing) + '\n';
    console.log(`Processed ${i}`);
    fs.appendFileSync(argv.out, str);
    let completionPercent = Math.floor(i / length * 100)
    if (completionPercent > progress) {
      console.log(completionPercent, "% Done");
      progress = completionPercent;
    }
  }
})()
