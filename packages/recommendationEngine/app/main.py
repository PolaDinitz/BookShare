from fastapi import FastAPI
from recommendationEngine import recommend_books

app = FastAPI()


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.get("/recommend/{book_id}")
async def get_recommendation(book_id: str):
    rcmd_dct = {}
    for book in book_id.split(','):
        recommendations = recommend_books(book)
        for recommendation in recommendations:
            if recommendation in rcmd_dct:
                rcmd_dct[recommendation] += 1
            else:
                rcmd_dct[recommendation] = 1
    rcmd_dct = dict(sorted(rcmd_dct.items(), key=lambda item: item[1]))
    print(rcmd_dct.keys)
    res_dct = {'book_id': list(rcmd_dct.keys())[:10]}
    return res_dct
