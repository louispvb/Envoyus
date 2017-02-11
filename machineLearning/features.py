"""
Features for ML training
"""

import re

def last_letter_ft(string):
    """Get last letter of a string"""
    return string[-1:]

def last_two_letters_ft(string):
    """Get last two letters of a string"""
    return string[-2:]

def first_letter_ft(string):
    """Get first letter of a string"""
    return string[:1]

def first_two_letters_ft(string):
    """Get first two letters of a string"""
    return string[:2]

def alpha_num_ratio_ft(string):
    """Determine the ratio of numbers to alpha characters"""
    alphas = 0.
    nums = 0.01
    for char in string:
        if char in '1234567890':
            nums += 1.
        if char in 'abcdefghijklmnopqrstuvxyz':
            alphas += 1.
    return alphas/nums #{'alpha_num_ratio': alphas / nums}

def largest_number_ft(string):
    """Get the largest number from a string"""
    large_array = sorted(re.findall(r'(\d+)', string))[-1:]
    if len(large_array) == 1:
        return int(large_array[0])
    return -9999

def first_letter_capital_ft(string):
    """Determine if first letter of a string is uppercase"""
    first_letter = string[-1:]
    return first_letter.isupper()

def word_length_ft(string):
    """Get length of string"""
    return len(string)

def clchunk_features(sentence, i):
    """Almagamate features for chunking"""
    word = sentence[i][0]
    word = str(word)
    lword = word.lower()
    if i == 0:
        prevword = "<START>"
    else:
        prevword = sentence[i-1][0]
        prevword = str(prevword)
    if i == len(sentence)-1:
        nextword = "<END>"
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
        "last_letter": last_letter_ft(lword),
        "last_two_letters": last_two_letters_ft(lword),
        "first_letter": first_letter_ft(lword),
        "first_two_letters": first_two_letters_ft(lword),
        "alpha_num_ratio": alpha_num_ratio_ft(lword),
        "largest_number": largest_number_ft(lword),
        "first_letter_capital": first_letter_capital_ft(word),
        "word_length": word_length_ft(word)
    }

def spec_features(string):
    """Amalgamate features for spec chunking"""
    string = string.lower()
    features = {
        'last_letter': last_letter_ft(string),
        'last_two_letters': last_two_letters_ft(string),
        'first_letter': first_letter_ft(string),
        'first_two_letters': first_two_letters_ft(string),
        'alpha_num_ratio': alpha_num_ratio_ft(string),
        'largest_number': largest_number_ft(string)
    }
    return features






