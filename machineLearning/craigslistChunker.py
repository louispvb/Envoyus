# Natural Language Toolkit: code_classifier_chunker
import json
import pickle
import dill as pickle
import random
import re

from nltk import NaiveBayesClassifier, classify, MaxentClassifier
import os.path
from pprint import pprint
import nltk
import numpy
import re
from nltk.corpus import conll2000

#########################################################################
class CraigListWordChunkTagger(nltk.TaggerI): # [_consec-chunk-tagger]
    def __init__(self, train_sents):
        train_set = []
        for tagged_sent in train_sents:
            untagged_sent = nltk.tag.untag(tagged_sent)
            history = []
            for i, (word, tag) in enumerate(tagged_sent):
                featureset = npchunk_features(untagged_sent, i, history) # [_consec-use-fe]
                train_set.append( (featureset, tag) )
                history.append(tag)
        self.classifier = nltk.NaiveBayesClassifier.train( # [_consec-use-maxent]
            train_set)

    def tag(self, sentence):
        history = []
        for i, word in enumerate(sentence):
            featureset = npchunk_features(sentence, i, history)
            tag = self.classifier.classify(featureset)
            history.append(tag)
        return zip(sentence, history)


class CraigListWordChunker(nltk.ChunkParserI): # [_consec-chunker]
    def __init__(self, train_sents):
        tagged_sents = [[((w,t),c) for [w,t,c] in sent]
                        for sent in train_sents]
        self.tagger = CraigListWordChunkTagger(tagged_sents)

    def parse(self, sentence):
        tagged_sents = self.tagger.tag(sentence)
        conlltags = [(w,t,c) for ((w,t),c) in tagged_sents]
        return nltk.chunk.conlltags2tree(conlltags)
########################################################################
##########################Features######################################

def last_letter_ft(s):
    return s[-1:]

def last_two_letters_ft(s):
    return s[-2:]

def first_letter_ft(s):
    return s[:1]

def first_two_letters_ft(s):
    return s[:2]

def alpha_num_ratio_ft(s):
    alphas = 0.
    nums = 0.01
    for c in s:
        if c in '1234567890':
            nums += 1.
        if c in 'abcdefghijklmnopqrstuvxyz':
            alphas += 1.
    return alphas/nums #{'alpha_num_ratio': alphas / nums}

def largest_number_ft(s):
    large_array = sorted(re.findall(r'(\d+)', s))[-1:]
    if len(large_array) == 1:
        return int(large_array[0])
    return -9999

def first_letter_capital_ft(s):
    first_letter = s[-1:]
    return first_letter.isupper()

def word_length_ft(s):
    return len(s)

def npchunk_features(sentence, i, history):
    word, pos = sentence[i]
    word = str(word)
    lword = word.lower()
    if i == 0:
        prevword, prevpos = "<START>", "<START>"
    else:
        prevword, prevpos = sentence[i-1]
        prevword = str(prevword)
    if i == len(sentence)-1:
        nextword, nextpos = "<END>", "<END>"
    else:
        nextword, nextpos = sentence[i+1]
        nextword = str(nextword)
    return {
            # "pos": pos,
            "word": lword,
            # "prevpos": prevpos,
            # "nextpos": nextpos,
            "prevword": prevword.lower(),
            "nextword": nextword.lower(),
            # "prevpos+pos": "%s+%s" % (prevpos, pos),
            # "pos+nextpos": "%s+%s" % (pos, nextpos), 
            "last_letter": last_letter_ft(lword),
            "last_two_letters": last_two_letters_ft(lword),
            "first_letter": first_letter_ft(lword),
            "first_two_letters": first_two_letters_ft(lword),
            "alpha_num_ratio": alpha_num_ratio_ft(lword),
            "largest_number": largest_number_ft(lword),
            "first_letter_capital": first_letter_capital_ft(word),
            "word_length": word_length_ft(word)
            }
            # "tags-since-dt": tags_since_dt(sentence, i)} 

########################################################################

def conll_tag_chunks(chunk_sents):
    tag_sents = [nltk.chunk.tree2conlltags(tree) for tree in chunk_sents]
    return [[[w, t, c] for (w, t, c) in chunk_tags] for chunk_tags in tag_sents]

def cnll_to_tree(chunk_sents):
    train_data = [[(w,t,c) for [w,t,c] in sent]
                      for sent in chunk_sents]
    train_data_tree = []
    for sent in train_data:
        train_data_tree.append(nltk.chunk.conlltags2tree(sent))
    return train_data_tree

########################################################################
file = open('learningData/annotationIOB.txt', 'r')
chunk = json.loads(file.read())
random.shuffle(chunk)
train_sents = chunk[:400];
test_sents = chunk[400:]
test_sents_tree = cnll_to_tree(test_sents)
from nltk.corpus import conll2000
wsjtext = conll_tag_chunks(conll2000.chunked_sents('train.txt')[100:110])

# pprint (chunk[100:110])
# pprint('########################################################################')
# pprint (wsjtext)

clchunker = CraigListWordChunker(train_sents)

listing = "Retina Macbook Pro in great condition-- selling because I got a new computer. Model is A1502 (Late 2013), special-upgraded with a 500gb SSD, and includes a bonus flush-fitting / removable 128gb expansion drive in the SD card slot. All the information on this model is available here: http://www.everymac.com/systems/apple/macbook_pro/specs/macbook-pro-core-i5-2.4-13-late-2013-retina-display-specs.html Full specifications: 2.4GHz dual-core Intel Core i5 processor (Turbo Boost up to 2.9GHz) with 3MB shared L3 cache 8GB of 1600MHz DDR3L onboard memory 500GB flash storage Intel Iris Graphics 802.11ac Wi-Fi wireless networking; Bluetooth 4.0 Runs anything you throw at it, including stuff like Photoshop or Diablo/Starcraft. Running the latest MacOS version (Sierra 10.12.2). Cash only. Pickup can happen during the daytime Monday Jan 2., or in the evening or early morning later this week. Email me with a number to reach you and a time or two when you could come to Ingleside to pick up."
tokens = nltk.word_tokenize(listing)
tokens = nltk.pos_tag(tokens)
# pprint(tokens)
result_tree  = clchunker.parse(tokens)
print(result_tree[0][0])
# print(clchunker.evaluate(test_sents_tree))

# trigramChunk = TrigramChunker(train_sents)
# print(trigramChunk.evaluate(test_sents_tree))
# trigramChunk.parse(tokens).draw()



