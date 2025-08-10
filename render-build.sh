#!/bin/bash

# Exit on error
set -o errexit

# Install the dependencies
pip install -r requirements.txt

# Run migrations
python manage.py migrate

# Collect the static files
python manage.py collectstatic --no-input