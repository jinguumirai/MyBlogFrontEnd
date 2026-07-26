# FastAPI Sample

最小構成の FastAPI アプリです。

## 起動方法

```bash
cd apps/api
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload --host 0.0.0.0 --port 8080
```

ブラウザで開きます。

```txt
http://localhost:8080/
```

JSON API はここです。

```txt
http://localhost:8080/api/hello
```
