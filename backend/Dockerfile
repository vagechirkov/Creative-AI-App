FROM python:3.9

# install Poetry
RUN pip install poetry==1.3.1

# copy project files
COPY app/app .

RUN poetry install --without dev


CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "5000"]
