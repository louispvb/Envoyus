import json
import pickle
import dill as pickle
import random
import re
from nltk.corpus import stopwords
from nltk.tokenize import wordpunct_tokenize

from nltk import NaiveBayesClassifier, classify, MaxentClassifier, download
import os.path


def disambiguation(test_str):
    # download stopwords
    download('stopwords')
    # removes ambiguous terms from string
    stop_words = set(stopwords.words('english'))
    # remove punctuation from string
    stop_words.update(['.', ',', '"', "'", '?', '!', ':', ';', '(', ')', '[', ']', '{', '}', '\n'])

    return ' '.join([i.lower() for i in wordpunct_tokenize(test_str) if i.lower() not in stop_words])

# FEATURES
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


def spec_features(s):
    s = s.lower()
    features = {
        'last_letter': last_letter_ft(s),
        'last_two_letters': last_two_letters_ft(s),
        'first_letter': first_letter_ft(s),
        'first_two_letters': first_two_letters_ft(s),
        'alpha_num_ratio': alpha_num_ratio_ft(s),
        'largest_number': largest_number_ft(s)
    }

    return features

def file_exists(path):
    return os.path.isfile(path)

def get_training_data(product):
    with open('./learningData/' + product + '.json') as data_file:
        return json.load(data_file)


# CLASSIFIERS
def train_spec_classifier(product = 'mbp'):
    tr_data = get_training_data(product)
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
            # 'Product Dimensions',
            # 'Item Dimensions  L x W x H',
            'Color',
            'ASIN',
            'Customer Reviews',
            'Best Sellers Rank',
            'Shipping Weight',
            'Domestic Shipping',
            'International Shipping',
            'Date First Available',
            # 'Product Name',
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
    nb_classifier.show_most_informative_features(10)

    def classifier(s):
        prob_dist = nb_classifier.prob_classify(spec_features(s))
        all_prob = map(lambda sample: (sample, prob_dist.prob(sample)), prob_dist.samples())
        return list(reversed(sorted(all_prob, key=lambda tup: tup[1])))

    return classifier

def spec_classifier(s):
    if file_exists('spec_classifier.pkl'):
        print('Loading spec classifier from pickle')
        f = open('spec_classifier.pkl', 'rb')
        classifier = pickle.load(f)
        f.close()
        return classifier(s)
    else:
        print('Training new spec classifier...')
        classifier = train_spec_classifier()
        f = open('spec_classifier.pkl', 'wb')
        pickle.dump(classifier, f)
        f.close()
        return classifier(s)

print(spec_classifier('8GB'))
