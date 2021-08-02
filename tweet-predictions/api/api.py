import flask
from flask import request, jsonify
import pandas as pd
import string 
import nltk
nltk.download('stopwords')
from nltk.corpus import stopwords
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression


app = flask.Flask(__name__)
app.config["DEBUG"] = True


all_tweets_df = pd.read_csv('tweets.csv')

def remove_punctuation(text):
    no_punct= ''.join(c for c in text if c not in string.punctuation)
    return no_punct
def remove_stopwords(text):
    stop_words = set(stopwords.words('english'))
    no_stopwords = ' '.join(c for c in text.split() if c not in stop_words)
    return no_stopwords
def clean(text):
    text = text.lower()
    text = remove_punctuation(text)
    text = remove_stopwords(text)
    return text

all_tweets_df['clean_text'] = all_tweets_df['text'].apply(clean)

tweets_train, tweets_test, y_train, y_test = train_test_split(all_tweets_df['clean_text'],
                                                              all_tweets_df['target'], 
                                                              test_size=0.20, random_state=123)

vectorizer = CountVectorizer()
vectorizer.fit(tweets_train)

X_train = vectorizer.transform(tweets_train)
X_test  = vectorizer.transform(tweets_test)

classifier = LogisticRegression()
classifier.fit(X_train, y_train)

@app.route('/', methods=['GET'])
def api_id():
    if 'text' in request.args:
        text = str(request.args['text'])
    else:
        return "Error: No text field provided. Please specify a tweet to get predictions."

    text = clean(text)
    if len(text.split()) < 5 :
        text = str(request.args['text'])

    input_string = vectorizer.transform([text])
    
    res = classifier.predict_proba(input_string) [0]
    return jsonify({"0":str(res[0]), "1":str(res[1])})

app.run()