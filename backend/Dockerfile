FROM python:3.9

WORKDIR /app

# install Poetry
RUN pip install poetry==1.3.1

COPY app ./

RUN cd /app

RUN poetry install --without dev

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "5000"]
