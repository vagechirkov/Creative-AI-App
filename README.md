# Creative-AI-App

## Backend

Setup `Poetry` in the virtual environment:

```zsh
mkdir backend
cd backend

export VENV_PATH=venv
python3 -m venv $VENV_PATH
$VENV_PATH/bin/pip install -U pip setuptools
$VENV_PATH/bin/pip install poetry
```

Create python project using `Poetry`:

```zsh

poetry new app
cd app

# add basic dependencies
poetry add fastapi uvicorn websockets

# add dev dependencies
poetry add --group dev black flake8 pytest
```

See more info about `Poetry` basic usage [here](https://python-poetry.org/docs/basic-usage/).
