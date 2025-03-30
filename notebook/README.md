# Crawler

## 환경
- python@3.13.2

## 가상환경 설정

```sh
$ python -m venv .venv
$ source .venv/bin/activate
```

## 패키지 다운로드

```sh
$ pip install -r requirements.txt
```

## 변수 설정

`insert_database.py` 의 `create_connection()` 함수 내 변수 설정

```py
# host, user, password, database
client = mysql.connector.connect(
    host="",
    user="",
    password="",
    database="",
)
```

## 실행

```sh
$ jupyter notebook
```