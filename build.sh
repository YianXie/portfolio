#!/bin/bash

# Build script for production deployment

echo "Building React frontend..."
cd frontend
npm install
npm run build
cd ..

echo "Collecting Django static files..."
python manage.py collectstatic --noinput

echo "Build complete! The application is ready for deployment."
echo "To run in production, use: gunicorn portfolio.wsgi:application"
