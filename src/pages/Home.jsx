import { useState, useEffect } from "react"
import PostCard from "../components/PostCard"
import PostForm from "../components/PostForm"

function Home() {

  // URL BACKEND ONLINE
  const API ="https://proyecto-final-b816.onrender.com"
  // POSTS
  const [posts, setPosts] = useState([])

  // IMAGENES
  const [imagenes, setImagenes] = useState([])

  // USERNAME
  const [username, setUsername] = useState("")

  // EDITING POST
  const [editingPost, setEditingPost] = useState(null)

  // FETCH POSTS
  async function fetchPosts() {

    const response = await fetch(
      `${API}/posts`
    )

    const data = await response.json()

    setPosts(data)

  }

  // FETCH IMAGENES
  async function fetchImagenes() {

    const response = await fetch(
      `${API}/imagenes`
    )

    const data = await response.json()

    setImagenes(data)

  }

  // ADD POST
  async function addPost(newPost) {

    const response = await fetch(
      `${API}/posts`,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          "usuario": username
        },

        body: JSON.stringify(newPost)
      }
    )

    const createdPost = await response.json()

    setPosts([createdPost, ...posts])

  }

  // DELETE POST
  async function deletePost(id) {

    await fetch(
      `${API}/posts/${id}`,
      {
        method: "DELETE"
      }
    )

    setPosts(
      posts.filter((post) => post.id !== id)
    )

  }

  // EDIT POST
  function editPost(post) {
    setEditingPost(post)
  }

  // UPDATE POST
  async function updatePost(updatedPost) {

    const response = await fetch(
      `${API}/posts/${editingPost.id}`,
      {
        method: "PUT",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify(updatedPost)
      }
    )

    const data = await response.json()

    setPosts(
      posts.map((post) =>
        post.id === editingPost.id
          ? data
          : post
      )
    )

    setEditingPost(null)

  }

  // LOAD POSTS + IMAGES
  useEffect(() => {

    fetchPosts()
    fetchImagenes()

  }, [])

  // RECOVER USER
  useEffect(() => {

    const savedUser =
      sessionStorage.getItem("user")

    if (savedUser) {
      setUsername(savedUser)
    }

  }, [])

  // SAVE USER
  useEffect(() => {

    sessionStorage.setItem(
      "user",
      username
    )

  }, [username])

  return (

    <div>

      {/* NAVBAR */}
      <nav className="navbar-custom">

        <div className="logo">
          Pinterest
        </div>

      </nav>

      <div className="container mt-4">

        {/* USER INPUT */}
        <div className="mb-4">

          <input
            type="text"
            className="form-control"
            placeholder="Your username..."
            value={username}
            onChange={(e) =>
              setUsername(e.target.value)
            }
          />

        </div>

        {/* FORM */}
        <PostForm
          addPost={addPost}
          updatePost={updatePost}
          username={username}
          editingPost={editingPost}
        />

        {/* POSTS */}
        <div className="pinterest-grid mt-5">

          {posts.map((post) => (

            <div
              className="pinterest-item"
              key={post.id}
            >

              <PostCard
                post={post}
                deletePost={deletePost}
                editPost={editPost}
              />

            </div>

          ))}

        </div>

        {/* DISCOVER */}
        <h2 className="discover-title">
          Discover
        </h2>

        <div className="pinterest-grid">

          {imagenes.map((imagen) => (

            <div
              className="pinterest-item"
              key={imagen.id}
            >

              <div className="card">

                <img
                  src={imagen.image}
                  className="card-img-top"
                  alt={imagen.description}
                />

                <div className="card-body">

                  <p>
                    {imagen.description}
                  </p>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>

  )
}

export default Home