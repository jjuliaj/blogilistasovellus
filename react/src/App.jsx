import { useEffect, useState } from 'react'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    blogService
      .getAll()
      .then(initialBlogs => {
        setBlogs(initialBlogs)
      })
  }, [])

  const buttonHandler = (blogiid) => {
    blogService.remove(blogiid)
    blogService.getAll()
      .then(response => {
        setBlogs(response)
      })
  }

  return (
    <div>
      <h1>Hieno blokiso vellus</h1>
      <ul>
        {blogs.map(blog =>
          <li key={blog.id}> Blogin otsikko: {blog.title}, Blogin tekijä: {blog.author}, Blogin osoite: {blog.url}, Tykkäyksiä: {blog.likes} <button type="button" onClick={() => buttonHandler(blog.id)}>Poisa</button></li>
        )}
      </ul>
    </div>
  )
}


export default App