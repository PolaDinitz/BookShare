import numpy as np
import pandas as pd
from joblib import load
from sklearn.metrics.pairwise import cosine_similarity


def predict(ds, book_id):
    tfidf_rev = load('../data/recommendationEngine_rev.joblib')
    tfidf_vec = load('../data/recommendationEngine_vec.joblib')
    index = np.where(ds['google_book_id'] == book_id)[0][0]
    read_book = ds.iloc[[index]]
    book_tfidf = tfidf_vec.transform(read_book['full_text'])
    cos_similarity_tfidf = map(lambda x: cosine_similarity(book_tfidf, x), tfidf_rev)
    output = list(cos_similarity_tfidf)
    return output


def get_recommendation(top, ds):
    recommendation = pd.DataFrame(columns=['title', 'google_book_id'])
    count = 0
    for i in top:
        recommendation.at[count, 'google_book_id'] = ds.iloc[i, 26]
        recommendation.at[count, 'title'] = ds.iloc[i, 11]
        count += 1
    return recommendation['google_book_id'].tolist()


def recommend_books(book_id):
    pd.set_option('display.max_columns', 100)
    ds = pd.read_csv('../data/cleaned_books.csv')
    output = predict(ds, book_id)
    top = sorted(range(len(output)), key=lambda i: output[i], reverse=True)[:10]
    return get_recommendation(top, ds)
