"""Simple service to serve CL listings to the annotator client"""

from nltk import sent_tokenize, word_tokenize, pos_tag
from bs4 import BeautifulSoup # pip3 install beautifulsoup4
from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
import json

def html_to_tagged_words(html):
    """Transform HTML strings into word tags"""
    text = BeautifulSoup(html, 'html.parser').get_text()
    paragraphs = [p for p in text.split('\n') if p]
    sentences = []
    for paragraph in paragraphs:
        for sentence in sent_tokenize(paragraph):
            sentences.append(sentence)
    print(sentences)
    return list(map(lambda sentence: pos_tag(word_tokenize(sentence)), sentences))

app = Flask(__name__)
CORS(app)

@app.route("/", methods=['POST'])
def main_route():
    json = request.json #get_json(silent=True)
    return jsonify({'result': html_to_tagged_words(json['input'])})

@app.route("/annotation", methods=['POST'])
def annotation_save():
    with open('annotations.json', 'a') as myfile:
        print('saving...')
        myfile.write(json.dumps(request.json)+'\n')
    return jsonify({'result': 'success'})

app.run()
