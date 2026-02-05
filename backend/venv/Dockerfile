# Usamos una imagen ligera de Python
FROM python:3.10-slim

# Evita que Python genere archivos .pyc y fuerza salida a consola
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

WORKDIR /app

# Instalamos dependencias
COPY requirements.txt /app/
RUN pip install --upgrade pip && pip install -r requirements.txt

# Copiamos el código
COPY . /app/

# Comando para correr la app (usaremos Gunicorn en prod)
CMD ["gunicorn", "core.wsgi:application", "--bind", "0.0.0.0:8000"]
