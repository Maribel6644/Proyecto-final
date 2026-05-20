
# Proyecto Final

Pinterest clone con React y FastAPI
=======


## Descripción

Aplicación web inspirada en Pinterest desarrollada con React, FastAPI y PostgreSQL.

El proyecto permite crear, editar y eliminar publicaciones, además de mostrar imágenes obtenidas desde la API de Unsplash.

---

# Tecnologías utilizadas

## Frontend
- React
- Vite
- Bootstrap 5
- JavaScript

## Backend
- FastAPI
- Python

## Base de datos
- PostgreSQL

## Deploy
- Vercel
- Render

## API externa
- Unsplash API

---

# Funcionalidades

- CRUD completo de posts
- Persistencia con PostgreSQL
- Consumo de API externa
- Protección de edición y eliminación por usuario
- Uso de sessionStorage
- OpenGraph
- Health endpoint
- Endpoint por ID
- Paginación

---

# Cómo ejecutar el frontend

## Instalar dependencias

```bash
npm install
```

## Ejecutar proyecto

```bash
npm run dev
```

Frontend local:

```bash
http://localhost:5173
```

---

# Cómo ejecutar el backend

## Entrar a la carpeta backend

```bash
cd pinterest-backend
```

## Instalar dependencias

```bash
pip install -r requirements.txt
```

## Ejecutar servidor

```bash
python -m uvicorn main:app --reload
```

Backend local:

```bash
http://127.0.0.1:8000
