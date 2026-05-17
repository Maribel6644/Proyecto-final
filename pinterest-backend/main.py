from fastapi import FastAPI
from pydantic  import BaseModel
from fastapi import Header
import requests
from dotenv import load_dotenv
import os

load_dotenv()

ACCESS_KEY = os.getenv("ACCESS_KEY")
print(ACCESS_KEY)
app=FastAPI()
posts=[]

class Post (BaseModel):
    id:int
    title:str
    image:str
    tags:list[str]
    user:str

@app.get("/posts")
def get_posts():
    return posts   

@app.post("/posts")
def create_post(post: Post,usuario:str=Header(...)):
   print(usuario)
   posts.append(post)
   return post

@app.delete("/posts/{id}")
def delete_post(id:int):
    #variable global para que no solo cambie localmente
    global posts
    #[nuevo_elemento for elemento in lista if condición]
    posts=[post for post in posts if post.id !=id]
    return {"message": "Post eliminado"}

@app.put("/posts/{id}")
def update_post(id: int, updated_post: Post):
    global posts
#si el post tiene ese id,reemplázalo.Si no,déjalo igual

from pydantic import BaseModel
from fastapi import Header
from fastapi.middleware.cors import CORSMiddleware
import requests

app = FastAPI()

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


    
@app.get("/imagenes")
def get_imagenes():

    headers = {
        "Authorization": f"Client-ID {ACCESS_KEY}" ,
         "Accept-Version": "v1"
    }

    response = requests.get(
        "https://api.unsplash.com/photos",
        headers=headers
    )

    data = response.json()

    imagenes = []

    for img in data:
        imagenes.append({ 
            "id": img["id"],
            "url": img["urls"]["small"],
            "autor": img["user"]["name"]
        })

    return imagenes


# API EXTERNA UNSPLASH
@app.get("/imagenes")
def get_imagenes():

    url = "https://api.unsplash.com/photos/random?count=9"

    headers = {
        "Authorization": "Client-ID QmbROGjkwsAqByT3OIgID5FoHuIvMaQ9APiq2D7qR4g"
    }

    response = requests.get(url, headers=headers)

    data = response.json()

    imagenes_transformadas = []

    for photo in data:

        imagenes_transformadas.append({
            "id": photo["id"],
            "image": photo["urls"]["regular"],
            "description": photo["alt_description"]
        })

    return imagenes_transformadas
