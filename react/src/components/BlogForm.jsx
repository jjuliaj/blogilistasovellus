import { useState } from 'react'

const BlogForm = ({ createBlog, toggleVisibility }) => {
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' })

  const addBlog = (event) => {
    event.preventDefault()
    createBlog(newBlog)
    setNewBlog({ title: '', author: '', url: '' })
  }

  const handleBlogChange = (event) => {
    const { name, value } = event.target
    setNewBlog({ ...newBlog, [name]: value })
  }

  return (
    <div>
      <h2>create new blog:</h2>
      <form onSubmit={addBlog}>
        title:
        <input
          name="title"
          value={newBlog.title}
          onChange={handleBlogChange}
        />
        <br />
        author:
        <input
          name="author"
          value={newBlog.author}
          onChange={handleBlogChange}
        />
        <br />
        url:
        <input
          name="url"
          value={newBlog.url}
          onChange={handleBlogChange}
        />
        <br />
        <button type="submit">save</button>
        <button type="button" onClick={toggleVisibility}>cancel</button>
      </form>
    </div>
  )
}

export default BlogForm