# RS Portal

RS Portal is a student management application built with a Django REST API backend and an Angular frontend. It is designed for managing student profiles, education details, and related admin workflows.

## Project Overview

- Backend: Django + Django REST Framework
- Frontend: Angular
- Local database: SQLite by default
- Optional database: MySQL
- Admin interface: Django admin panel

## Project Structure

```text
edu-app/
├── backend/
│   ├── config/
│   ├── students/
│   ├── manage.py
│   ├── db.sqlite3
│   ├── requirements.txt
│   └── .venv/
├── rsportal/
│   └── frontend/
├── README.md
└── .gitignore
```

## Tech Stack

- Python 3.13
- Django 4.2
- djangorestframework 3.16
- django-cors-headers
- SQLite (default for local development)
- MySQL (optional)
- Angular 20

## Prerequisites

Before running the project, ensure you have the following installed:

- Python 3.10+
- Node.js 18+
- npm
- Git
- Windows PowerShell or a similar terminal

## Backend Setup

1. Open PowerShell in the project root.
2. Create and activate a virtual environment:

   ```powershell
   cd backend
   python -m venv .venv
   .\.venv\Scripts\Activate.ps1
   ```

3. Install the project dependencies:

   ```powershell
   pip install -r requirements.txt
   ```

4. Run database migrations:

   ```powershell
   python manage.py migrate
   ```

5. Start the Django server:

   ```powershell
   python manage.py runserver
   ```

The backend will be available at:

```text
http://localhost:8000/
```

## Frontend Setup

1. Open a new terminal in the frontend folder:

   ```powershell
   cd rsportal\frontend
   npm install
   ```

2. Start the Angular app:

   ```powershell
   npm start
   ```

The frontend will be available at:

```text
http://localhost:4200/
```

## Database Configuration

The project defaults to SQLite for local development. This avoids the MySQL access issue unless a MySQL server is intentionally configured.

### SQLite (default)

No extra environment variable is required. The app uses:

```text
backend/db.sqlite3
```

### MySQL (optional)

To switch to MySQL, set:

```powershell
$env:DJANGO_USE_SQLITE = "0"
$env:DJANGO_DB_NAME = "edu_app"
$env:DJANGO_DB_USER = "admin"
$env:DJANGO_DB_PASSWORD = "your_password"
$env:DJANGO_DB_HOST = "127.0.0.1"
$env:DJANGO_DB_PORT = "3306"
```

Then start Django again:

```powershell
python manage.py runserver
```

## Django Admin Login

A default admin user has been created for local use.

- Username: `admin`
- Password: `Admin@123`

Access the admin UI at:

```text
http://localhost:8000/admin/
```

## Create a New Admin User

If you need to create another superuser:

```powershell
python manage.py createsuperuser
```

## Useful Commands

```powershell
# Run Django system checks
python manage.py check

# Apply migrations
python manage.py migrate

# Run tests
python manage.py test

# Start the dev server
python manage.py runserver
```

## Troubleshooting

### MySQL access denied error

If you see an error like:

```text
Access denied for user 'admin'@'localhost'
```

then one of the following is true:

- MySQL is being used while the wrong password/credentials are configured.
- A stale Django server process is still running with old MySQL config.
- The project should be using SQLite locally.

Fix by:

1. Stopping the running server.
2. Ensuring SQLite is the active default, or setting valid MySQL env vars.
3. Restarting Django.

### Admin login fails

If the Django admin page rejects the login, ensure:

- the backend server is running,
- you are visiting `http://localhost:8000/admin/`,
- no old browser session is blocking the auth cookie,
- the database is the local SQLite DB used by this project.

## Notes

- The default admin credentials are for local development only.
- For production, use a secure password and set environment variables appropriately.
- The Angular app is configured for local development CORS access to the Django backend.
