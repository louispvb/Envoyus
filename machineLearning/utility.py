"""Utility functions for processing chunks. Includes grammatical tree representation of chunks."""

# Natural Language Toolkit: code_classifier_chunker
import json
import os.path
import nltk
from nltk import download
from nltk.corpus import stopwords
from nltk.tokenize import wordpunct_tokenize

def conll_tag_chunks(chunk_sents):
    """Transform and tag chunk sentences"""
    tag_sents = [nltk.chunk.tree2conlltags(tree) for tree in chunk_sents]
    return [[[w, t, c] for (w, t, c) in chunk_tags] for chunk_tags in tag_sents]

def cnll_to_tree(chunk_sents):
    """Transform chunk sentences to fit tree"""
    train_data = [[(w, t, c) for [w, t, c] in sent] for sent in chunk_sents]
    train_data_tree = []
    for sent in train_data:
        train_data_tree.append(nltk.chunk.conlltags2tree(sent))
    return train_data_tree

def convert_array_ck(tree):
    """Processing for grammar tree"""
    listing = []
    for subtree in tree.subtrees():
        if subtree.label() == "CK":
            word = []
            for leaf in subtree.leaves():
                word.append(leaf[0])
            listing.append(' '.join(word))
    return listing

def convert_array_co(tree):
    """Processing for grammar tree"""
    listing = []
    for subtree in tree.subtrees():
        if subtree.label() == "CO":
            word = []
            for leaf in subtree.leaves():
                word.append(leaf[0])
            listing.append(' '.join(word))
    return listing

def disambiguation(test_str):
    """Remove punctuation from strings"""
    # download stopwords
    download('stopwords')
    # removes ambiguous terms from string
    stop_words = set(stopwords.words('english'))
    # remove punctuation from string
    stop_words.update(['.', ',', '"', "'", '?', '!', ':', ';', '(', ')', '[', ']', '{', '}', '\n'])
    jstr = [i.lower() for i in wordpunct_tokenize(test_str) if i.lower() not in stop_words]
    return ' '.join(jstr)

def file_exists(path):
    return os.path.isfile(path)

def get_training_data(product):
    with open('./learningData/' + product + '.json') as data_file:
        return json.load(data_file)

def get_training_data(filename):
    with open(filename) as data_file:
        return json.load(data_file)
