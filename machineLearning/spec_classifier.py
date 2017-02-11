"""Alternative algorithm for chunking text"""

from pprint import pprint

from classifiers import spec_classifier
from utility import disambiguation, get_training_data

# Import test data test.json
TEST_DATA_MBP = get_training_data('test')

def parse_all_specs(all_listings, clfyr, verbose=False, acc_tol=.5):
    """Parse all specs"""
    for listing_obj in all_listings:
        test_title_str = listing_obj['title']
        test_description_arr = listing_obj['description']
        test_description_arr = '\n'.join(test_description_arr)
        test_attributes_str = listing_obj['attributes']

        test_str = '\n'.join([test_title_str, test_attributes_str])

        print(test_str)


def spec_parser(string, clfyr, verbose, acc_tol):
    """Parse individual spec content string"""
    words = string.split()
    final_specs = {}
    for i, word in enumerate(words):
        sub_str = ' '.join(words[:i+1])
        if verbose:
            pprint('%s | %s' % (word, sub_str))
        pos_specs = clfyr(sub_str)[:2]
        if verbose:
            print(pos_specs)
        for spec_tuple in pos_specs:
            max_acc = final_specs.get(spec_tuple[0], {}).get('accuracy', 0)
            try:
                cur_spec = spec_tuple[0]
            except:
                cur_spec = None
            try:
                cur_acc = spec_tuple[1]
            except:
                max_acc = 0
            if all([cur_acc > acc_tol, max_acc < cur_acc]):
                final_specs[cur_spec] = {
                    'accuracy': cur_acc,
                    'string': sub_str
                }
    spec_reducer(final_specs, clfyr, verbose, acc_tol)
    return final_specs


def spec_reducer(final_specs, clfyr, verbose, acc_tol):
    """reduce from left-to-right to isolate highest propability string"""
    for cur_spec in final_specs:
        string = final_specs.get(cur_spec, {}).get('string', '')
        max_acc = final_specs.get(cur_spec, {}).get('accuracy', 0)
        words = string.split()
        final_spec_info = final_specs
        for i, _word in enumerate(words):
            red_str = ' '.join(words[i:])
            if verbose:
                print('test string -> ', red_str)
            top_spec = clfyr(red_str)[0]
            cur_acc = top_spec[1] if top_spec[0] == cur_spec else 0
            if all([cur_acc > acc_tol, max_acc < cur_acc]):
                final_spec_info[cur_spec] = {
                    'accuracy': cur_acc,
                    'string': red_str
                }
                if verbose:
                    print('spec: ', cur_spec, final_spec_info[cur_spec])

    if verbose:
        print(final_specs)
    return final_specs

TEST_STR1 = TEST_DATA_MBP[0]['description']
ROUND1 = spec_parser(TEST_STR1, spec_classifier, True, 0.5)
TEST_STR2 = disambiguation(TEST_STR1)
ROUND2 = spec_parser(TEST_STR2, spec_classifier, True, 0.5)

print('-----------raw text-----------\n')
print(TEST_STR1)

print('\n\n-----------specs from raw text-----------\n')
print(ROUND1)


print('\n\n-----------refined text-----------\n')
print(TEST_STR2)

print('\n\n-----------specs from refined text-----------\n')
print(ROUND2)















#
