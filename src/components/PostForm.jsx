import { useState, useEffect } from "react"

function PostForm({
  addPost,
  updatePost,
  username,
  editingPost
}) {

  const [title, setTitle] = useState("")
  const [image, setImage] = useState("")
  const [tags, setTags] = useState("")

  // LLENAR FORMULARIO AL EDITAR
  useEffect(() => {

    if (editingPost) {

      setTitle(editingPost.title)
      setImage(editingPost.image)
      setTags(editingPost.tags.join(","))

    }

  }, [editingPost])

  function handleSubmit(e) {

    e.preventDefault()

    const newPost = {
      title,
      image,
      tags: tags.split(","),
      user: username
    }

    // SI ESTAMOS EDITANDO
    if (editingPost) {

      updatePost(newPost)

    } else {

      addPost(newPost)

    }

    setTitle("")
    setImage("")
    setTags("")

  }

  return (
    <form onSubmit={handleSubmit} className="mb-4">

      <input
        type="text"
        placeholder="Titulo"
        className="form-control mb-2"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        type="text"
        placeholder="URL de imagen"
        className="form-control mb-2"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />

      <input
        type="text"
        placeholder="tags separados por coma"
        className="form-control mb-2"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
      />

      <button className="btn btn-primary">

        {editingPost ? "Actualizar Post" : "Agregar Post"}

      </button>

    </form>
  )
}

export default PostForm