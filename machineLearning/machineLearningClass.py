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
from utility import disambiguation, convertArrayCk, file_exists, get_training_data
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


class CraigListWordChunker(nltk.ChunkParserI): # [_consec-chunker]
    def __init__(self, train_sents):
        tagged_sents = [[((w,t),c) for [w,t,c] in sent]
                        for sent in train_sents]
        self.tagger = CraigListWordChunkTagger(tagged_sents)

    def parse(self, sentence, convertFn):
        sentenceTokens = nltk.word_tokenize(sentence)
        sentenceTokens = nltk.pos_tag(sentenceTokens)
        tagged_sents = self.tagger.tag(sentenceTokens)
        conlltags = [(w,t,c) for ((w,t),c) in tagged_sents]
        return convertFn(nltk.chunk.conlltags2tree(conlltags))

##############################################################################################
























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
    train_set, test_set = featuresets[:], featuresets[1200:]



    nb_classifier = NaiveBayesClassifier.train(train_set)
    # nb_classifier.classify(string)
    # nb_classifier.prob_classify(string)
    # print(classify.accuracy(nb_classifier, test_set))
    # nb_classifier.show_most_informative_features(1)

    def classifier(s):
        prob_dist = nb_classifier.prob_classify(spec_features(s))
        all_prob = map(lambda sample: (sample, prob_dist.prob(sample)), prob_dist.samples())
        return list(reversed(sorted(all_prob, key=lambda tup: tup[1])))

    return classifier

def spec_classifier(s):
    if file_exists('spec_classifier.pkl'):
        # print('Loading spec classifier from pickle')
        f = open('spec_classifier.pkl', 'rb')
        classifier = pickle.load(f)
        f.close()
        return classifier(s)
    else:
        print('Training new spec classifier...')
        classifier = train_spec_classifier('./learningData/mbp.json')
        f = open('spec_classifier.pkl', 'wb')
        pickle.dump(classifier, f)
        f.close()
        return classifier(s)

# CLASSIFIERS

# class CraigListSpecClassifier(filename): 
#     def __init__(self, train_sents):
        
#         self.classifier = CraigListWordChunkTagger(tagged_sents)
#     def parse(phrase, )
##############################################################################################

