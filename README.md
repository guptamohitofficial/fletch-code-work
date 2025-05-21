# Loan Application System

A full-stack web application for managing loan applications, built with Next.js and Django.

## Tech Stack

### Frontend
- Next.js 15.3.2
- React 19
- TypeScript
- TailwindCSS
- Axios for API calls

### Backend
- Django 5.2.1
- Django REST Framework
- SQLite Database
- JWT Authentication
- CORS Support

## Project Structure

```
├── frontend_/           # Next.js frontend application
│   ├── app/            # Main application code
│   ├── public/         # Static assets
│   └── config.js       # Configuration settings
│
└── backend_/           # Django backend application
    ├── loan_app/       # Main Django application
    │   ├── models.py   # Database models
    │   └── views.py    # API endpoints
    ├── quick_api/      # API configuration
    └── manage.py       # Django management script
```

## Getting Started

### Prerequisites
- Node.js (Latest LTS version)
- Python 3.8+
- pip (Python package manager)

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend_
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```
   The frontend will be available at `http://localhost:3000`

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend_
   ```

2. Create and activate a virtual environment (recommended):
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Run migrations:
   ```bash
   python manage.py migrate
   ```

5. Start the development server:
   ```bash
   python manage.py runserver
   ```
   The backend API will be available at `http://localhost:8000`

## Features
- Modern, responsive UI built with Next.js and TailwindCSS
- RESTful API endpoints for loan management
- JWT-based authentication
- SQLite database for data persistence
- CORS support for secure cross-origin requests

## Development
- Frontend development server supports hot reloading
- Backend includes Django's development server with debug mode
- TypeScript for type safety in frontend development
- Django REST Framework for API development

## API Documentation
The API endpoints are available at `http://localhost:8000/api/`. Key endpoints include:
- `/api/loans/` - Loan management endpoints
- `/api/auth/` - Authentication endpoints

## Contributing
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License
This project is licensed under the MIT License. 