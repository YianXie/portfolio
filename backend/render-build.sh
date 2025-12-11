#!/bin/bash

# Exit on error
set -o errexit

# Install the Python dependencies
pip install -r requirements.txt

# Run migrations
python manage.py makemigrations && python manage.py migrate
