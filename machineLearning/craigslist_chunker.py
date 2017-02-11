"""
Craigslist Chunker entrypoint
"""
import json
import sys

from utility import convert_array_ck, convert_array_co
from machine_learning_class import spec_classifier, parseContainer, condition_classifier


def process_postings(post_arr):
    """Takes an array of posts with chunks and classifies them with ML."""
    for phrase in post_arr['chunk']:
        classifier_tag = spec_classifier(phrase)[:2]
        temp = [[spec for spec in classPair] for classPair in classifier_tag]
        print(json.dumps([phrase, temp]))
    for phrase in post_arr['condition']:
        condition_tag = condition_classifier(phrase)[:2]
        temp = [[spec for spec in classPair] for classPair in condition_tag]
        print(json.dumps([phrase, temp]))



CL_CHUNKER = parseContainer()
RES_ARRAY_KEY_SPECS = CL_CHUNKER.parse(sys.argv[1], convert_array_ck, convert_array_co)
process_postings(RES_ARRAY_KEY_SPECS)



