var fs = require('fs')
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
      if (Number.isNaN(Number(sentenceObj.value))) {
        tuple[2] = 'B-CK'
      } else {
        tuple[2] = 'B-CO'
      }
    } else if(index > sentenceObj.begin && index <= sentenceObj.end) {
      if (Number.isNaN(Number(sentenceObj.value))) {
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

var convertSentenceToData = (sentenceObj) => {
  condition_words = sentenceObj.sentence.slice(sentenceObj.begin, sentenceObj.end+1).map(word=>word[0]).join(' ');
  var output = {};
  output[(sentenceObj.value).toString()] = condition_words;
  return output
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

var processPostIOB = (post) => {
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

var processPostConditionData = (post) => {
  var conditionArray = [];
  for (var i = 0; i < post.length; i++) {
    if (!Number.isNaN(Number(post[i].value))) {
      conditionArray.push(convertSentenceToData(post[i]));
    }
  }
  return conditionArray
}

var processPostSpecData = (post) => {
  var conditionArray = [];
  for (var i = 0; i < post.length; i++) {
    if (Number.isNaN(Number(post[i].value))) {
      conditionArray.push(convertSentenceToData(post[i]));
    }
  }
  return conditionArray
}

var allLine = [];

rlp.createInterface({
    input: fs.createReadStream('./annotations_2.json')
})
.each(function(line) {
  var post = JSON.parse(line);
  allLine.push(post)
})
.then(function() {
  var data = allLine.map(post=>processPostIOB(post))
  var data = [].concat.apply([], data);
  var conditionData = allLine.map(post=>processPostConditionData(post));
  var conditionData = [].concat.apply([], conditionData);
  var specData = allLine.map(post=>processPostSpecData(post))
  var specData = [].concat.apply([], specData)
  console.log(data);
  console.log(conditionData);
  console.log(specData);
  fs.writeFileSync ('./annotationIOB2.txt', JSON.stringify(data), function(err) {
    if (err) throw err;
    console.log('complete');
  });
  fs.writeFileSync ('./conditionTraining2.json', JSON.stringify(conditionData), function(err) {
    if (err) throw err;
    console.log('complete');
  });
  fs.writeFileSync ('./specTraining2.json', JSON.stringify(specData), function(err) {
    if (err) throw err;
    console.log('complete');
  });
})
.caught(function(err) {
    throw err;
});

