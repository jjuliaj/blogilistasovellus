const BlogForm = ({
  onSubmit, handleTitleChange, handleAuthorChange, handleUrlChange, newBlog
}) => {
  return (
    <div>
      <h2>create new blog:</h2>
      <form onSubmit={onSubmit}>
        title:
        <input
          name="title"
          value={newBlog.title}
          onChange={handleTitleChange}
        />
        <br />
        author:
        <input
          name="author"
          value={newBlog.author}
          onChange={handleAuthorChange}
        />
        <br />
        url:
        <input
          name="url"
          value={newBlog.url}
          onChange={handleUrlChange}
        />
        <br />
        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default BlogForm