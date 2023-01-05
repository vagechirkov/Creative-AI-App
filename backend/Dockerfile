FROM python:3.9

# install Poetry
RUN pip install poetry==1.3.1

WORKDIR /app

# copy project files
COPY app/poetry.lock app/poetry.toms ./

RUN poetry install --without dev

COPY app/app ./app

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "5000"]
