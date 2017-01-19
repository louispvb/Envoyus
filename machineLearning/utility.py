# Natural Language Toolkit: code_classifier_chunker
import json
import os.path
from nltk import download
from nltk.corpus import stopwords
from nltk.tokenize import wordpunct_tokenize

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


def convertArrayCk(tree):
    listing = []
    for subtree in tree.subtrees():
        if subtree.label()=="CK":
            # print(subtree.leaves())
            word = []
            for leaf in subtree.leaves():
                word.append(leaf[0])
            listing.append(' '.join(word))
    return listing

########################################################################
def disambiguation(test_str):
    # download stopwords
    download('stopwords')
    # removes ambiguous terms from string
    stop_words = set(stopwords.words('english'))
    # remove punctuation from string
    stop_words.update(['.', ',', '"', "'", '?', '!', ':', ';', '(', ')', '[', ']', '{', '}', '\n'])

    return ' '.join([i.lower() for i in wordpunct_tokenize(test_str) if i.lower() not in stop_words])

def file_exists(path):
    return os.path.isfile(path)

def get_training_data(product):
    with open('./learningData/' + product + '.json') as data_file:
        return json.load(data_file)
        
def get_training_data(filename):
    with open(filename) as data_file:
        return json.load(data_file)

# test_sents_tree = cnll_to_tree(test_sents)
# wsjtext = conll_tag_chunks(conll2000.chunked_sents('train.txt')[100:110])



