FROM python:3.9

ENV YOUR_ENV=${YOUR_ENV} \
  PYTHONFAULTHANDLER=1 \
  PYTHONUNBUFFERED=1 \
  PYTHONHASHSEED=random \
  PIP_NO_CACHE_DIR=off \
  PIP_DISABLE_PIP_VERSION_CHECK=on \
  PIP_DEFAULT_TIMEOUT=100 \
  POETRY_VERSION=1.3.1 \
  VENV_PATH=venv

WORKDIR /app

# install Poetry
RUN python3 -m venv $VENV_PATH
ENV PATH=app/$VENV_PATH/bin:$PATH

RUN pip install "poetry==$POETRY_VERSION"

COPY app/poetry.lock ./
COPY app/pyproject.toml ./

RUN poetry install --without dev

COPY app/app ./app

CMD ["poetry", "run", "uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "5000"]
