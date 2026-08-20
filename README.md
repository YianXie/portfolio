# Ian's Portfolio

A modern portfolio website built with React frontend and Django backend.

## 🚀 Tech Stack

### Frontend

- **React** - UI library
- **React Router** - Client-side routing
- **Vite** - Build tool and dev server
- **Axios** - HTTP client for API requests

### Backend

- **Django** - Web framework
- **Django REST Framework** - API framework
- **Django CORS Headers** - CORS middleware

## 📋 Features

- **Home Page** - Introduction with animated role text, about section, programming skills, and social media links
- **Projects Page** - Dynamically fetches and displays GitHub repositories with language statistics
- **Contributions Page** - Showcase of competitions and events with interactive flip cards
- **Contact Page** - Contact form with email integration via Django backend

## 🛠️ Setup Instructions

### Prerequisites

- Python 3.8+
- Node.js 16+
- npm or yarn

### Backend Setup

1. Clone the repository:

```bash
git clone https://github.com/YianXie/portfolio.git
cd portfolio
```

2. Install Python dependencies:

```bash
pip install -r requirements.txt
```

3. Create a `.env` file in the root directory with the following variables:

```env
SECRET_KEY=your-secret-key-here
ENVIRONMENT=development
EMAIL_HOST_USER=your-email@gmail.com
EMAIL_HOST_PASSWORD=your-app-password
REPOS_TOKEN=your-github-token (optional)
```

4. Run database migrations:

```bash
python manage.py migrate
```

### Frontend Setup

1. Navigate to the frontend directory:

```bash
cd frontend
```

2. Install npm dependencies:

```bash
npm install
```

## 🏃 Running the Application

### Development Mode

#### Option 1: Run Frontend and Backend Separately (Recommended for Development)

1. Start the Django backend (from root directory):

```bash
python manage.py runserver
```

The backend will run on `http://localhost:8000`

2. In a new terminal, start the Vite dev server (from frontend directory):

```bash
cd frontend
npm run dev
```

The frontend will run on `http://localhost:5173`

#### Option 2: Run Production Build with Django

1. Build the React app:

```bash
cd frontend
npm run build
```

2. Start Django server (from root directory):

```bash
python manage.py runserver
```

The full application will be served at `http://localhost:8000`

### Production Deployment

1. Build the frontend:

```bash
cd frontend
npm run build
```

2. Collect static files:

```bash
python manage.py collectstatic --noinput
```

3. Run with gunicorn or your preferred WSGI server:

```bash
gunicorn portfolio.wsgi:application
```

## 📁 Project Structure

```
portfolio/
├── frontend/                 # React frontend
│   ├── public/              # Static assets (images, favicon)
│   ├── src/
│   │   ├── components/      # Reusable React components
│   │   │   ├── Header.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── ...
│   │   ├── pages/           # Page components
│   │   │   ├── Home.jsx
│   │   │   ├── Projects.jsx
│   │   │   ├── Contributions.jsx
│   │   │   └── Contact.jsx
│   │   ├── App.jsx          # Main app component
│   │   └── main.jsx         # Entry point
│   ├── package.json
│   └── vite.config.js
├── portfolio/               # Django project settings
│   ├── settings.py
│   ├── urls.py
│   └── ...
├── contacts/                # Contact API Django app
├── home/                    # Legacy Django app
├── projects/                # Legacy Django app
├── contributions/           # Legacy Django app
├── manage.py
├── requirements.txt
└── README.md
```

## 🔌 API Endpoints

- `POST /api/contact/api/` - Submit contact form
    - Request body: `{ name, email, message }`
    - Response: `{ message: "Success message" }`

## 🎨 Styling

The application uses vanilla CSS with a dark theme. Key style files:

- `frontend/src/index.css` - Global styles
- `frontend/src/pages/*.css` - Page-specific styles
- `frontend/src/components/*.css` - Component-specific styles

## 🌐 Environment Variables

| Variable            | Description                      | Required               |
| ------------------- | -------------------------------- | ---------------------- |
| SECRET_KEY          | Django secret key                | Yes                    |
| ENVIRONMENT         | `development` or `production`    | Yes                    |
| EMAIL_HOST_USER     | Gmail account for sending emails | Yes (for contact form) |
| EMAIL_HOST_PASSWORD | Gmail app password               | Yes (for contact form) |
| REPOS_TOKEN         | GitHub personal access token     | No                     |

## 📝 License

MIT License.

## 🤝 Contributing

This is a personal portfolio project. Feel free to fork and adapt for your own use!

## 📧 Contact

- **Email**: yianxie52@gmail.com
- **GitHub**: [@YianXie](https://github.com/YianXie)
- **Instagram**: [@xya_ian_sg](https://www.instagram.com/xya_ian_sg/)
