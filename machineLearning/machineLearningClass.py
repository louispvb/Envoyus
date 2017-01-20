
# Natural Language Toolkit: code_classifier_chunker
import json
import pickle
import dill as pickle
import random
from nltk import NaiveBayesClassifier, classify, MaxentClassifier
import os.path
from pprint import pprint
import nltk
from nltk import sent_tokenize, word_tokenize, pos_tag
import numpy
import re
from nltk.corpus import conll2000, stopwords
from features import clchunk_features, spec_features
from utility import disambiguation, convertArrayCk, file_exists, get_training_data, convertArrayCo
#########################################################################
class CraigListWordChunkTagger(nltk.TaggerI): # [_consec-chunk-tagger]
    def __init__(self, train_sents):
        train_set = []
        for tagged_sent in train_sents:
            untagged_sent = nltk.tag.untag(tagged_sent)
            history = []
            for i, (word, tag) in enumerate(tagged_sent):
                featureset = clchunk_features(untagged_sent, i, history) # [_consec-use-fe]
                train_set.append( (featureset, tag) )
                history.append(tag)
        self.classifier = nltk.NaiveBayesClassifier.train( # [_consec-use-maxent]
            train_set)

    def tag(self, sentence):
        history = []
        for i, word in enumerate(sentence):
            featureset = clchunk_features(sentence, i, history)
            tag = self.classifier.classify(featureset)
            history.append(tag)
        return zip(sentence, history)


def parseDescription(text):
        paragraphs = [p for p in text.split('\n') if p]
        sentences = []
        for paragraph in paragraphs:
            sentences.append(paragraph)
             # for sentence in sent_tokenize(paragraph):
             #     sentences.append(sentence)
        return sentences

class CraigListWordChunker(nltk.ChunkParserI): # [_consec-chunker]
    def __init__(self, train_sents):
        tagged_sents = [[((w,t),c) for [w,t,c] in sent]
                        for sent in train_sents]
        self.tagger = CraigListWordChunkTagger(tagged_sents)

    def parse(self, description, convertFn, convertFn2):
        sentences = parseDescription(description)
        totalTags = []
        for sentence in sentences:
            sentenceTokens = nltk.word_tokenize(sentence)
            sentenceTokens = nltk.pos_tag(sentenceTokens)
            tagged_sents = self.tagger.tag(sentenceTokens)
            totalTags += tagged_sents
        conlltags = [(w,t,c) for ((w,t),c) in totalTags]
        output = {}
        output['chunk'] = convertFn(nltk.chunk.conlltags2tree(conlltags)) #convert tree to chunks
        output['condition'] = convertFn2(nltk.chunk.conlltags2tree(conlltags)) #convert tree to conditions
        return output

def parseContainer():
    if file_exists('keyword_chunking.pkl'):
        # print('Loading spec classifier from pickle')
        f = open('keyword_chunking.pkl', 'rb')
        clChunker = pickle.load(f)
        f.close()
        return clChunker
    else:
        # print('Training new chunking...')
        chunk = get_training_data('./annotationIOB2.txt')
        random.shuffle(chunk)
        train_sents = chunk
        # test_sents = chunk[400:]
        clChunker = CraigListWordChunker(train_sents)
        f = open('keyword_chunking.pkl', 'wb')
        pickle.dump(clChunker, f)
        f.close()
        return clChunker

##############################################################################################
def train_spec_classifier(filename):
    tr_data = get_training_data(filename)
    specs = []
    spec_list = {}
    fav_spec = ('', 0)
    for listing in (tr_data):
        for key, spec in listing.items():
            perSpec = [(disambiguation(spec), key)]
            specs += perSpec
            # get list of all specs
            try:
                spec_list[perSpec[0][1]] += 1
            except:
                spec_list[perSpec[0][1]] = 1
            if spec_list[perSpec[0][1]] > fav_spec[1]:
                fav_spec = (perSpec[0][1], spec_list[perSpec[0][1]])

    # print('spec', specs)
    top_spec_list = []
    for spec in spec_list:
        # eliminates ambiguous specs related to Amazon
        bad_specs = [
            'Series',
            'Item model number',
            'Hardware Platform',
            'Operating System',
            'Color',
            'ASIN',
            'Customer Reviews',
            'Best Sellers Rank',
            'Shipping Weight',
            'Domestic Shipping',
            'International Shipping',
            'Date First Available',
            'Shipping Information',
            'Manufacturer',
            'Date first available at Amazon.com'
        ]

        if all( not(x == spec) for x in bad_specs):
            # pulls top specs (if over 0% have the given spec)
            if spec_list[spec] > fav_spec[1]*0:
                top_spec_list += [(spec)]

    filtered_specs = []
    for spec in specs:
        if any( (x == spec[1]) for x in top_spec_list):
            filtered_specs += [(spec)]

    random.shuffle(filtered_specs)
    featuresets = [(spec_features(s), label) for (s, label) in filtered_specs]
    # train_set, test_set = featuresets[:], featuresets[1200:]
    train_set, test_set = featuresets, featuresets[1200:]    
    nb_classifier = NaiveBayesClassifier.train(train_set)
    def classifier(s):
        prob_dist = nb_classifier.prob_classify(spec_features(s))
        all_prob = map(lambda sample: (sample, prob_dist.prob(sample)), prob_dist.samples())
        # print (all_prob)
        return list(reversed(sorted(all_prob, key=lambda tup: tup[1])))

    return classifier

def spec_classifier(s):
    if file_exists('spec_classifier.pkl'):
        # print('Loading spec classifier from pickle')ffffffffffffffffffffffffffffffffffffffffffff
        f = open('spec_classifier.pkl', 'rb')
        classifier = pickle.load(f)
        f.close()
        return classifier(s)
    else:
        print('Training new spec classifier...')
        classifier = train_spec_classifier('./specTraining2.json')
        f = open('spec_classifier.pkl', 'wb')
        pickle.dump(classifier, f)
        f.close()
        return classifier(s)

def condition_classifier(s):
    if file_exists('condition_classifier.pkl'):
        # print('Loading spec classifier from pickle')ffffffffffffffffffffffffffffffffffffffffffff
        f = open('condition_classifier.pkl', 'rb')
        conditionClassifier = pickle.load(f)
        f.close()
        return conditionClassifier(s)
    else:
        print('Training new condition classifier...')
        conditionClassifier = train_spec_classifier('./conditionTraining2.json')
        f = open('condition_classifier.pkl', 'wb')
        pickle.dump(conditionClassifier, f)
        f.close()
        return conditionClassifier(s)


# CLASSIFIERS

# class CraigListSpecClassifier(filename): 
#     def __init__(self, train_sents):
        
#         self.classifier = CraigListWordChunkTagger(tagged_sents)
#     def parse(phrase, )
##############################################################################################
