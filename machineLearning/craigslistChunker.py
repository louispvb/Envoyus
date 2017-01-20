# Natural Language Toolkit: code_classifier_chunker
import json
import random
from utility import disambiguation, convertArrayCk, file_exists, get_training_data
from machineLearningClass import CraigListWordChunker, spec_classifier, parseContainer
import sys
#########################################################################
def processPosting(postArr):
    for phrase in postArr:
        classifierTag = spec_classifier(phrase)[:2]
        # print(phrase)
        # print (classifierTag)
        temp = [[spec for spec in classPair] for classPair in classifierTag]
        print(json.dumps([phrase, temp]))



# listing = "\n         \n13\" MacBook Pro  \n2.5 GHz Core i5 (Mid 2012) Processor  \n500 GB Hard Drive  \n4 GB Ram  \nAlmost perfect condition. No scratches, dents or blemishes. Has had overlay case and screen protector since day one. Comes with original box and power supply.    "
clChunker = parseContainer()
resultArrayKeySpecs = clChunker.parse(sys.argv[1], convertArrayCk)
processPosting(resultArrayKeySpecs)



