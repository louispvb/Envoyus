"""
Extracts chunks from unstructured text
"""

# Natural Language Toolkit: code_classifier_chunker
import pickle
import random
import nltk
import dill as pickle

from nltk import NaiveBayesClassifier
from features import clchunk_features, spec_features
from utility import disambiguation, file_exists, get_training_data

class CLWordChunkTagger(nltk.TaggerI):
    """Create tags from chunks"""
    def __init__(self, train_sents):
        train_set = []
        for tagged_sent in train_sents:
            untagged_sent = nltk.tag.untag(tagged_sent)
            history = []
            for i, (_word, tag) in enumerate(tagged_sent):
                featureset = clchunk_features(untagged_sent, i)
                train_set.append((featureset, tag))
                history.append(tag)
        self.classifier = nltk.NaiveBayesClassifier.train(train_set)

    def tag(self, sentence):
        history = []
        for i, _word in enumerate(sentence):
            featureset = clchunk_features(sentence, i)
            tag = self.classifier.classify(featureset)
            history.append(tag)
        return zip(sentence, history)


def parse_description(text):
    """Transform text into sentences"""
    paragraphs = [p for p in text.split('\n') if p]
    sentences = []
    for paragraph in paragraphs:
        sentences.append(paragraph)
    return sentences

class CLWordChunker(nltk.ChunkParserI):
    """Create chunks"""

    def __init__(self, train_sents):
        tagged_sents = [[((w, t), c) for [w, t, c] in sent]
                        for sent in train_sents]
        self.tagger = CLWordChunkTagger(tagged_sents)

    def parse(self, description, convertFn, convertFn2):
        sentences = parse_description(description)
        total_tags = []
        for sentence in sentences:
            sent_tok = nltk.word_tokenize(sentence)
            sent_tok = nltk.pos_tag(sent_tok)
            tagged_sents = self.tagger.tag(sent_tok)
            total_tags += tagged_sents
        conlltags = [(w, t, c) for ((w, t), c) in total_tags]
        output = {}
        output['chunk'] = convertFn(nltk.chunk.conlltags2tree(conlltags))
        output['condition'] = convertFn2(nltk.chunk.conlltags2tree(conlltags))
        return output

def parse_container():
    """Return general chunker function"""
    if file_exists('keyword_chunking.pkl'):
        # print('Loading spec classifier from pickle')
        pkfile = open('keyword_chunking.pkl', 'rb')
        cl_chunker = pickle.load(pkfile)
        pkfile.close()
        return cl_chunker
    else:
        # print('Training new chunking...')
        chunk = get_training_data('./annotationIOB2.txt')
        random.shuffle(chunk)
        train_sents = chunk
        cl_chunker = CLWordChunker(train_sents)
        pkfile = open('keyword_chunking.pkl', 'wb')
        pickle.dump(cl_chunker, pkfile)
        pkfile.close()
        return cl_chunker

def train_spec_classifier(filename):
    """Trains the spec classifier from a file"""
    tr_data = get_training_data(filename)
    specs = []
    spec_list = {}
    fav_spec = ('', 0)
    for listing in tr_data:
        for key, spec in listing.items():
            per_spec = [(disambiguation(spec), key)]
            specs += per_spec
            # get list of all specs
            try:
                spec_list[per_spec[0][1]] += 1
            except:
                spec_list[per_spec[0][1]] = 1
            if spec_list[per_spec[0][1]] > fav_spec[1]:
                fav_spec = (per_spec[0][1], spec_list[per_spec[0][1]])

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

        if all(not(x == spec) for x in bad_specs):
            # pulls top specs (if over 0% have the given spec)
            if spec_list[spec] > fav_spec[1]*0:
                top_spec_list += [(spec)]

    filtered_specs = []
    for spec in specs:
        if any((x == spec[1]) for x in top_spec_list):
            filtered_specs += [(spec)]

    random.shuffle(filtered_specs)
    featuresets = [(spec_features(s), label) for (s, label) in filtered_specs]
    train_set = featuresets
    nb_classifier = NaiveBayesClassifier.train(train_set)
    def classifier(string):
        """Spec classifier to return"""
        prob_dist = nb_classifier.prob_classify(spec_features(string))
        all_prob = map(lambda sample: (sample, prob_dist.prob(sample)), prob_dist.samples())
        # print (all_prob)
        return list(reversed(sorted(all_prob, key=lambda tup: tup[1])))

    return classifier

def spec_classifier(string):
    """Main spec classifier to use. Reloads classifier from pickle when available."""
    if file_exists('spec_classifier.pkl'):
        # print('Loading spec classifier from pickle')
        pkfile = open('spec_classifier.pkl', 'rb')
        classifier = pickle.load(pkfile)
        pkfile.close()
        return classifier(string)
    else:
        print('Training new spec classifier...')
        classifier = train_spec_classifier('./specTraining2.json')
        pkfile = open('spec_classifier.pkl', 'wb')
        pickle.dump(classifier, pkfile)
        pkfile.close()
        return classifier(string)

def condition_classifier(string):
    """Main spec classifier to use. Reloads classifier from pickle when available."""
    if file_exists('condition_classifier.pkl'):
        # print('Loading spec classifier from pickle')
        pkfile = open('condition_classifier.pkl', 'rb')
        cond_classifier = pickle.load(pkfile)
        pkfile.close()
        return cond_classifier(string)
    else:
        print('Training new condition classifier...')
        cond_classifier = train_spec_classifier('./conditionTraining2.json')
        pkfile = open('cond_classifier.pkl', 'wb')
        pickle.dump(cond_classifier, pkfile)
        pkfile.close()
        return cond_classifier(string)

