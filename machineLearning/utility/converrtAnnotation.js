// [('Confidence', 'NN', 'B-NP'), ('in', 'IN', 'O'), ('the', 'DT', 'B-NP'), ('pound', 'NN', 'I-NP'), ('is', 'VBZ', 'O'), ('widely', 'RB', 'O'), ('expected', 'VBN', 'O'), ('to', 'TO', 'O'), ('take', 'VB', 'O'), ('another', 'DT', 'B-NP'), ('sharp', 'JJ', 'I-NP'), ('dive', 'NN', 'I-NP'), ('if', 'IN', 'O'), ('trade', 'NN', 'B-NP'), ('figures', 'NNS', 'I-NP'), ('for', 'IN', 'O'), ('September', 'NNP', 'B-NP'), (',', ',', 'O'), ('due', 'JJ', 'O'), ('for', 'IN', 'O'), ('release', 'NN', 'B-NP'), ('tomorrow', 'NN', 'B-NP'), (',', ',', 'O'), ('fail', 'VB', 'O'), ('to', 'TO', 'O'), ('show', 'VB', 'O'), ('a', 'DT', 'B-NP'), ('substantial', 'JJ', 'I-NP'), ('improvement', 'NN', 'I-NP'), ('from', 'IN', 'O'), ('July', 'NNP', 'B-NP'), ('and', 'CC', 'I-NP'), ('August', 'NNP', 'I-NP'), ("'s", 'POS', 'B-NP'), ('near-record', 'JJ', 'I-NP'), ('deficits', 'NNS', 'I-NP'), ('.', '.', 'O')]
// [('Chancellor', 'NNP', 'O'), ('of', 'IN', 'O'), ('the', 'DT', 'B-NP'), ('Exchequer', 'NNP', 'I-NP'), ('Nigel', 'NNP', 'B-NP'), ('Lawson', 'NNP', 'I-NP'), ("'s", 'POS', 'B-NP'), ('restated', 'VBN', 'I-NP'), ('commitment', 'NN', 'I-NP'), ('to', 'TO', 'O'), ('a', 'DT', 'B-NP'), ('firm', 'NN', 'I-NP'), ('monetary', 'JJ', 'I-NP'), ('policy', 'NN', 'I-NP'), ('has', 'VBZ', 'O'), ('helped', 'VBN', 'O'), ('to', 'TO', 'O'), ('prevent', 'VB', 'O'), ('a', 'DT', 'B-NP'), ('freefall', 'NN', 'I-NP'), ('in', 'IN', 'O'), ('sterling', 'NN', 'B-NP'), ('over', 'IN', 'O'), ('the', 'DT', 'B-NP'), ('past', 'JJ', 'I-NP'), ('week', 'NN', 'I-NP'), ('.', '.', 'O')]
// [('Macbook', 'NNP', 'B-CK'), ('Pro', 'NNP', 'I-CK'), ('Retina', 'NNP', 'I-CK'), ('2015', 'CD', 'B-CK'), ('is', 'VBZ', 'O')]

// [["MacBook", "NNP"], ["Pro", "NNP"], ["Retina", "NNP"], [2015, "CD"]], "value": 0, "words": [["MacBook", "NNP"], ["Pro", "NNP"], ["Retina", "NNP"]]}, {"end": 4, "begin": 3, "sentence": [["It", "PRP"], ["is", "VBZ"], ["in", "IN"], ["pristine", "JJ"], ["condition", "NN"], ["-", ":"], ["flawless/like", "JJ"], ["new", "JJ"], [".", "."]]

var fs = require('fs')

var testPost = [{"end": 2, "begin": 0, "sentence": [["MacBook", "NNP"], ["Pro", "NNP"], ["Retina", "NNP"], [2015, "CD"]], "value": 0, "words": [["MacBook", "NNP"], ["Pro", "NNP"], ["Retina", "NNP"]]}, {"end": 4, "begin": 3, "sentence": [["It", "PRP"], ["is", "VBZ"], ["in", "IN"], ["pristine", "JJ"], ["condition", "NN"], ["-", ":"], ["flawless/like", "JJ"], ["new", "JJ"], [".", "."]], "value": 3, "words": [["pristine", "JJ"], ["condition", "NN"]]}, {"end": 8, "begin": 6, "sentence": [["It", "PRP"], ["is", "VBZ"], ["in", "IN"], ["pristine", "JJ"], ["condition", "NN"], ["-", ":"], ["flawless/like", "JJ"], ["new", "JJ"], [".", "."]], "value": 3, "words": [["flawless/like", "JJ"], ["new", "JJ"], [".", "."]]}, {"end": 10, "begin": 9, "sentence": [["Comes", "NNS"], ["with", "IN"], ["original", "JJ"], ["box", "NN"], ["and", "CC"], ["quick", "JJ"], ["start", "NN"], ["guide", "NN"], [",", ","], ["MagSafe", "NNP"], [2, "CD"], ["Power", "NNP"], ["Adapter", "NNP"], [",", ","], ["AC", "NNP"], ["wall", "NN"], ["plug", "NN"], [",", ","], ["and", "CC"], ["a", "DT"], ["Power", "NNP"], ["cord", "NN"], [".", "."]], "value": 0, "words": [["MagSafe", "NNP"], [2, "CD"]]}, {"end": 1, "begin": 0, "sentence": [["Retina", "NNP"], ["display", "NN"], [":", ":"], ["13.3-inch", "JJ"], ["(", "("], ["diagonal", "JJ"], [")", ")"], ["LED-backlit", "JJ"], ["display", "NN"], ["with", "IN"], ["IPS", "NNP"], ["technology", "NN"], [";", ":"], ["2560-by-1600", "JJ"], ["resolution", "NN"], ["at", "IN"], [227, "CD"], ["pixels", "NNS"], ["per", "IN"], ["inch", "NN"], ["with", "IN"], ["support", "NN"], ["for", "IN"], ["millions", "NNS"], ["of", "IN"], ["colors", "NNS"], [".", "."]], "value": 0, "words": [["Retina", "NNP"], ["display", "NN"]]}, {"end": 3, "begin": 3, "sentence": [["Retina", "NNP"], ["display", "NN"], [":", ":"], ["13.3-inch", "JJ"], ["(", "("], ["diagonal", "JJ"], [")", ")"], ["LED-backlit", "JJ"], ["display", "NN"], ["with", "IN"], ["IPS", "NNP"], ["technology", "NN"], [";", ":"], ["2560-by-1600", "JJ"], ["resolution", "NN"], ["at", "IN"], [227, "CD"], ["pixels", "NNS"], ["per", "IN"], ["inch", "NN"], ["with", "IN"], ["support", "NN"], ["for", "IN"], ["millions", "NNS"], ["of", "IN"], ["colors", "NNS"], [".", "."]], "value": 0, "words": [["13.3-inch", "JJ"]]}, {"end": 8, "begin": 7, "sentence": [["Retina", "NNP"], ["display", "NN"], [":", ":"], ["13.3-inch", "JJ"], ["(", "("], ["diagonal", "JJ"], [")", ")"], ["LED-backlit", "JJ"], ["display", "NN"], ["with", "IN"], ["IPS", "NNP"], ["technology", "NN"], [";", ":"], ["2560-by-1600", "JJ"], ["resolution", "NN"], ["at", "IN"], [227, "CD"], ["pixels", "NNS"], ["per", "IN"], ["inch", "NN"], ["with", "IN"], ["support", "NN"], ["for", "IN"], ["millions", "NNS"], ["of", "IN"], ["colors", "NNS"], [".", "."]], "value": 0, "words": [["LED-backlit", "JJ"], ["display", "NN"]]}, {"end": 0, "begin": 0, "sentence": [["2.7GHz", "CD"], ["dual-core", "JJ"], ["Intel", "NNP"], ["Core", "NNP"], ["i5", "NN"], ["processor", "NN"], ["(", "("], ["Turbo", "NNP"], ["Boost", "NNP"], ["up", "RB"], ["to", "TO"], ["3.1GHz", "CD"], [")", ")"], ["with", "IN"], ["3MB", "CD"], ["shared", "VBD"], ["L3", "NNP"], ["cache", "NN"]], "value": 0, "words": [["2.7GHz", "CD"]]}, {"end": 4, "begin": 1, "sentence": [["2.7GHz", "CD"], ["dual-core", "JJ"], ["Intel", "NNP"], ["Core", "NNP"], ["i5", "NN"], ["processor", "NN"], ["(", "("], ["Turbo", "NNP"], ["Boost", "NNP"], ["up", "RB"], ["to", "TO"], ["3.1GHz", "CD"], [")", ")"], ["with", "IN"], ["3MB", "CD"], ["shared", "VBD"], ["L3", "NNP"], ["cache", "NN"]], "value": 0, "words": [["dual-core", "JJ"], ["Intel", "NNP"], ["Core", "NNP"], ["i5", "NN"]]}, {"end": 3, "begin": 1, "sentence": [["Intel", "NNP"], ["Iris", "NNP"], ["Graphics", "NNP"], [6100, "CD"]], "value": 0, "words": [["Iris", "NNP"], ["Graphics", "NNP"], [6100, "CD"]]}, {"end": 2, "begin": 0, "sentence": [["Full-size", "JJ"], ["backlit", "NNS"], ["keyboard", "NN"], ["with", "IN"], [78, "CD"], ["(", "("], ["U.S.", "NNP"], [")", ")"], ["or", "CC"], [79, "CD"], ["(", "("], ["ISO", "NNP"], [")", ")"], ["keys", "NNS"], [",", ","], ["including", "VBG"], [12, "CD"], ["function", "NN"], ["keys", "NNS"], ["and", "CC"], [4, "CD"], ["arrow", "NN"], ["keys", "NNS"], ["(", "("], ["inverted", "VBN"], ["``", "``"], ["T", "NNP"], ["''", "''"], ["arrangement", "NN"], [")", ")"], ["with", "IN"], ["ambient", "NN"], ["light", "NN"], ["sensor", "NN"], [".", "."]], "value": 0, "words": [["Full-size", "JJ"], ["backlit", "NNS"], ["keyboard", "NN"]]}, {"end": 1, "begin": 0, "sentence": [["Bluetooth", "DT"], ["4.0", "CD"], ["wireless", "NN"], ["technology", "NN"]], "value": 0, "words": [["Bluetooth", "DT"], ["4.0", "CD"]]}, {"end": 2, "begin": 0, "sentence": [["Force", "NNP"], ["Touch", "NNP"], ["trackpad", "NN"], ["for", "IN"], ["precise", "JJ"], ["cursor", "NN"], ["control", "NN"], ["and", "CC"], ["pressure-sensing", "JJ"], ["capabilities", "NNS"], [";", ":"], ["enables", "VBZ"], ["Force", "NNP"], ["clicks", "NNS"], [",", ","], ["accelerators", "NNS"], [",", ","], ["pressure-sensitive", "JJ"], ["drawing", "NN"], [",", ","], ["and", "CC"], ["Multi-Touch", "JJ"], ["gestures", "NNS"], [".", "."]], "value": 0, "words": [["Force", "NNP"], ["Touch", "NNP"], ["trackpad", "NN"]]}]

// var inputArray = [{"words": [["Good", "JJ"], ["condition", "NN"]], "value": 2, "begin": 0, "end": 1, "sentence": [["Good", "JJ"], ["condition", "NN"], [".", "."]]}, {"words": [["Mid", "NNP"], [2012, "CD"]], "value": 0, "begin": 5, "end": 6, "sentence": [["MacBook", "NNP"], ["Pro", "NNP"], ["(", "("], ["13-inch", "JJ"], [",", ","], ["Mid", "NNP"], [2012, "CD"], [")", ")"]]}]
// var sentenceObj = {"words": [["Mid", "NNP"], [2012, "CD"]], "value": 0, "begin": 5, "end": 6, "sentence": [["MacBook", "NNP"], ["Pro", "NNP"], ["(", "("], ["13-inch", "JJ"], [",", ","], ["Mid", "NNP"], [2012, "CD"], [")", ")"]]}
var sentenceObj1 = {"end": 3, "begin": 3, "sentence": [["Retina", "NNP"], ["display", "NN"], [":", ":"], ["13.3-inch", "JJ"], ["(", "("], ["diagonal", "JJ"], [")", ")"], ["LED-backlit", "JJ"], ["display", "NN"], ["with", "IN"], ["IPS", "NNP"], ["technology", "NN"], [";", ":"], ["2560-by-1600", "JJ"], ["resolution", "NN"], ["at", "IN"], [227, "CD"], ["pixels", "NNS"], ["per", "IN"], ["inch", "NN"], ["with", "IN"], ["support", "NN"], ["for", "IN"], ["millions", "NNS"], ["of", "IN"], ["colors", "NNS"], [".", "."]], "value": 0, "words": [["13.3-inch", "JJ"]]}
var sentenceObj2 = {"end": 8, "begin": 7, "sentence": [["Retina", "NNP"], ["display", "NN"], [":", ":"], ["13.3-inch", "JJ"], ["(", "("], ["diagonal", "JJ"], [")", ")"], ["LED-backlit", "JJ"], ["display", "NN"], ["with", "IN"], ["IPS", "NNP"], ["technology", "NN"], [";", ":"], ["2560-by-1600", "JJ"], ["resolution", "NN"], ["at", "IN"], [227, "CD"], ["pixels", "NNS"], ["per", "IN"], ["inch", "NN"], ["with", "IN"], ["support", "NN"], ["for", "IN"], ["millions", "NNS"], ["of", "IN"], ["colors", "NNS"], [".", "."]], "value": 0, "words": [["LED-backlit", "JJ"], ["display", "NN"]]}
var lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('./annotations.json')
});

var rlp = require('readline-promise');

/*
Scraped Data
Input Array 
[
  Obj,
  {
    begin: number
    end: number (in a group)
    sentence: [
                ['macbook', 'POS'],
                ['pro', 'POS']
              ]
    value: number // 
    words: [array of chunked words]
  }
  Obj, //could be a repeat sentence
]
Output Array: arrays of array 
'word', 'POS', 'IOB-Classification'
[[], [], []]
*/

var convertSentenceToIOB = (sentenceObj) => {
  return sentenceObj.sentence.map((wordArray, index)=>{
    var tuple = [];
    tuple = wordArray.slice();
    if (index === sentenceObj.begin) {
      if (sentenceObj.value === 0) {
        tuple[2] = 'B-CK'
      } else {
        tuple[2] = 'B-CO'
      }
    } else if(index > sentenceObj.begin && index <= sentenceObj.end) {
      if (sentenceObj.value === 0) {
        tuple[2] = 'I-CK'
      } else {
        tuple[2] = 'I-CO'
      }
    } else {
      tuple[2] = 'O'
    }
    return tuple
  })
}

var combineSentence = (sentenceArr1, sentenceArr2) => {
  return sentenceArr1.map((wordArray, index)=>{
    var tuple = [];
    if (sentenceArr1[index][2] !== 'O') {
      tuple = sentenceArr1[index].slice();
    } else if (sentenceArr2[index][2] !== 'O') {
      tuple = sentenceArr2[index].slice();
    } else {
      tuple = sentenceArr1[index].slice();
    }
    return tuple
  })
}



var isSameSentence = (sentenceArr1, sentenceArr2) => {
  if (sentenceArr1.length !== sentenceArr2.length) {
    return false
  } else {
    for (var index=0; index < sentenceArr1.length; index++) {
      if (sentenceArr1[index][0] !== sentenceArr2[index][0]) {
        return false;
      }
    }
    return true
  }
}

var processPost = (post) => {
  var iobArray = [];
  for (var i = 0; i < post.length; i++) {
    iobArray.push(convertSentenceToIOB(post[i]));
  }
  var uniqueIobArray = []
  var isSame = false
  for (var i = 0; i < iobArray.length; i++) {
    for (var j = 0; j < uniqueIobArray.length; j++) {
      if (isSameSentence(iobArray[i], uniqueIobArray[j])) {
        // console.log(iobArray[i], uniqueIobArray[j], 'same in function')
        isSame = true
        break;
      }
    }
    // console.log(iobArray[i].map(word=>word[0]),isSame);
    if (!isSame) {
      uniqueIobArray.push(iobArray[i])
    } else {
      uniqueIobArray[j] = combineSentence(uniqueIobArray[j], iobArray[i])
    }
    isSame = false;     
  }
  return uniqueIobArray
}

// var result1 = convertSentenceToIOB(sentenceObj1);
// var result2 = convertSentenceToIOB(sentenceObj2);
// var combinedResult = combineSentence(result1, result2);
// fs.readFile('./annotations.json',  (err, data) => {
//   if (err) throw err;
//   console.log(JSON.parse(data.toString()));
// });
var allLine = [];

rlp.createInterface({
    input: fs.createReadStream('./annotations.json')
})
.each(function(line) {
  var post = JSON.parse(line);
  allLine.push(post)
  //allLine.push[JSON.parse(line)];
})
.then(function() {
  console.log(allLine, 'all the text')
  var data = allLine.map(post=>(processPost(post)))
  var data = [].concat.apply([], data);
  console.log(data.length);
  // console.log(data)
  fs.writeFile ('./annotationIOB.txt', JSON.stringify(data), function(err) {
    if (err) throw err;
    console.log('complete');
  });
})
.caught(function(err) {
    throw err;
});

//setTimeOut()
// console.log(allLines)
// var data = processPost(testPost)


