#!/bin/bash

# Exit on error
set -o errexit

# Install Node.js dependencies and build React app
cd frontend
npm install
npm run build
cd ..

# Install the Python dependencies
pip install -r requirements.txt

# Run migrations
python manage.py migrate
