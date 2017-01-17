# Natural Language Toolkit: code_classifier_chunker
import json
import pickle
import dill as pickle
import random
from nltk import NaiveBayesClassifier, classify, MaxentClassifier, download
from nltk.tokenize import wordpunct_tokenize
import os.path
from pprint import pprint
import nltk
import numpy
import re
from nltk.corpus import conll2000, stopwords
from features import clchunk_features, spec_features
from nltk.corpus import conll2000
from utility import disambiguation, convertArrayCk, file_exists, get_training_data
from machineLearningClass import CraigListWordChunker, spec_classifier
#########################################################################
def processPosting(postArr):
    for phrase in postArr:
        print(phrase, spec_classifier(phrase)[:2])

chunk = get_training_data('learningData/annotationIOB.txt')
random.shuffle(chunk)
train_sents = chunk[:400];
test_sents = chunk[400:]
clChunker = CraigListWordChunker(train_sents)
listing = "Retina Macbook Pro in great condition-- selling because I got a new computer. Model is A1502 (Late 2013), special-upgraded with a 500gb SSD, and includes a bonus flush-fitting / removable 128gb expansion drive in the SD card slot. All the information on this model is available here: http://www.everymac.com/systems/apple/macbook_pro/specs/macbook-pro-core-i5-2.4-13-late-2013-retina-display-specs.html Full specifications: 2.4GHz dual-core Intel Core i5 processor (Turbo Boost up to 2.9GHz) with 3MB shared L3 cache 8GB of 1600MHz DDR3L onboard memory 500GB flash storage Intel Iris Graphics 802.11ac Wi-Fi wireless networking; Bluetooth 4.0 Runs anything you throw at it, including stuff like Photoshop or Diablo/Starcraft. Running the latest MacOS version (Sierra 10.12.2). Cash only. Pickup can happen during the daytime Monday Jan 2., or in the evening or early morning later this week. Email me with a number to reach you and a time or two when you could come to Ingleside to pick up."
resultArrayKeySpecs = clchunker.parse(listing, convertArrayCk)
# print (resultArrayKeySpecs)
pprint(listing)
processPosting(resultArrayKeySpecs)
# print(spec_classifier('8GB')[:2])



