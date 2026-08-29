INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",

    "corsheaders",
    "rest_framework",

    "students",
]

# Use BigAutoField by default for automatic primary keys
DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"


MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",

    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

import os

# Base directory for project files (used for SQLite path and templates)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# DEBUG and hosts
# Default to DEBUG on for local development; override with DJANGO_DEBUG=0 in production
DEBUG = str(os.environ.get("DJANGO_DEBUG", "1")).lower() in ("1", "true", "yes")

# ALLOWED_HOSTS can be a comma-separated list in DJANGO_ALLOWED_HOSTS
ALLOWED_HOSTS = [h.strip() for h in os.environ.get("DJANGO_ALLOWED_HOSTS", "localhost,127.0.0.1").split(",") if h.strip()]

# Secret key for Django; override in production via DJANGO_SECRET_KEY
SECRET_KEY = os.environ.get("DJANGO_SECRET_KEY", "dev-secret-key-change-me")

# Root URL configuration
ROOT_URLCONF = "config.urls"

# Static files (CSS, JavaScript, Images)
STATIC_URL = "/static/"

# Use SQLite by default for local development; set DJANGO_USE_SQLITE=0 to use MySQL.
USE_SQLITE = str(os.environ.get("DJANGO_USE_SQLITE", "1")).lower() in ("1", "true", "yes")

if USE_SQLITE:
    BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    DATABASES = {
        "default": {
            "ENGINE": "django.db.backends.sqlite3",
            "NAME": os.path.join(BASE_DIR, "db.sqlite3"),
        }
    }
else:
    # Database configuration using MySQL. Values are read from environment
    # variables so you can point to a MySQL server in different environments.
    DATABASES = {
        "default": {
            "ENGINE": os.environ.get("DJANGO_DB_ENGINE", "django.db.backends.mysql"),
            "NAME": os.environ.get("DJANGO_DB_NAME", "edu_app"),
            "USER": os.environ.get("DJANGO_DB_USER", "admin"),
            "PASSWORD": os.environ.get("DJANGO_DB_PASSWORD", "admin"),
            "HOST": os.environ.get("DJANGO_DB_HOST", "127.0.0.1"),
            "PORT": os.environ.get("DJANGO_DB_PORT", "3306"),
            # Recommended MySQL options
            "OPTIONS": {
                "charset": "utf8mb4",
                # Use a stable SQL_MODE; adjust if your server requires different modes
                "init_command": "SET sql_mode='STRICT_TRANS_TABLES'",
            },
            # persistent connections (seconds); 0 means disabled
            "CONN_MAX_AGE": int(os.environ.get("DJANGO_DB_CONN_MAX_AGE", "600")),
        }
    }

CORS_ALLOWED_ORIGINS = [
    "http://localhost:4200",
]

REST_FRAMEWORK = {
    "DEFAULT_RENDERER_CLASSES": [
        "rest_framework.renderers.JSONRenderer",
    ],
    "DEFAULT_PARSER_CLASSES": [
        "rest_framework.parsers.JSONParser",
    ],
}


# Minimal templates configuration required by Django admin and other apps
TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [os.path.join(BASE_DIR, "templates")],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]
