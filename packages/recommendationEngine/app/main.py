import time
from random import sample

from fastapi import FastAPI
from recommendationEngine import recommend_books

app = FastAPI()


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.get("/recommend/{book_id}")
async def get_recommendation(book_id: str):
    start = time.time()
    rcmd_dct = {}
    for book in book_id.split(','):
        recommendations = recommend_books(book)
        for recommendation in recommendations:
            if recommendation in rcmd_dct:
                rcmd_dct[recommendation] += 1
            else:
                rcmd_dct[recommendation] = 1
    rcmd_dct = dict(sorted(rcmd_dct.items(), key=lambda item: item[1]))
    book_id, title = zip(*sample(list(rcmd_dct.keys()), 10))
    res_dct = {'book_id': book_id, 'title': title}
    print("Time taken to build response: %s seconds" % (time.time() - start))

    return res_dct
