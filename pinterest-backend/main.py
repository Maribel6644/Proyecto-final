from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from pydantic import BaseModel
from fastapi import Header
from fastapi.middleware.cors import CORSMiddleware
import requests
from dotenv import load_dotenv
import os

# CARGAR .ENV
load_dotenv()

ACCESS_KEY = os.getenv("ACCESS_KEY")

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

posts = []

# MODELO
class Post(BaseModel):
    id: int | None = None
    title: str
    image: str
    tags: list[str]
    user: str


# GET POSTS
@app.get("/posts")
def get_posts():
    return posts


# CREATE POST
@app.post("/posts")
def create_post(post: Post, usuario: str = Header(...)):

    print(usuario)

    # GENERAR ID AUTOMÁTICO
    post.id = len(posts) + 1

    posts.append(post)

    return post


# DELETE POST
@app.delete("/posts/{id}")
def delete_post(id: int):

    global posts

    posts = [
        post for post in posts
        if post.id != id
    ]

    return {"message": "Post eliminado"}


# UPDATE POST
@app.put("/posts/{id}")
def update_post(id: int, updated_post: Post):

    global posts

    updated_post.id = id

    posts = [
        updated_post if post.id == id else post
        for post in posts
    ]

    return updated_post


# API EXTERNA UNSPLASH
@app.get("/imagenes")
def get_imagenes():

    url = "https://api.unsplash.com/photos/random?count=9"

    headers = {
        "Authorization": f"Client-ID {ACCESS_KEY}"
    }

    response = requests.get(url, headers=headers)

    data = response.json()

    imagenes_transformadas = []

    for photo in data:

        imagenes_transformadas.append({
             "id": photo["id"],
             "image": photo["urls"]["regular"],
             "description": photo["alt_description"] or "Imagen"
        })

    return imagenes_transformadas