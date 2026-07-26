from fastapi import FastAPI
from fastapi.responses import HTMLResponse

app = FastAPI()


@app.get("/", response_class=HTMLResponse)
def home() -> str:
    return """
    <!doctype html>
    <html lang="ja">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>FastAPI Sample</title>
      </head>
      <body>
        <h1>Hello FastAPI</h1>
        <p>これは FastAPI で作った最小のウェブページです。</p>
        <p><a href="/api/hello">JSON API を見る</a></p>
      </body>
    </html>
    """


@app.get("/api/hello")
def hello() -> dict[str, str]:
    return {"message": "Hello from FastAPI"}
