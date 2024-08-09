import { useEffect, useState } from 'react'
//import Blog from './components/Blog' 
//toi ehkä myöhemmi käyttöön
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  //const [newBlog, setNewBlog] = useState('')

  useEffect(() => {
    blogService
      .getAll()
      .then(initialBlogs => {
        setBlogs(initialBlogs)
      })
  }, [])

  /*const addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: newBlog.title,
      author: newBlog.author,
      url: newBlog.url,
      likes: newBlog.likes
    }

    blogService
      .create(blogObject)
        .then(returnedBlog => {
          setBlogs(blogs.concat(returnedBlog))
          setNewBlog('')
        })
  }*/

  return (
    <div>
      <h1>Tähän ehkä toimiva sovellus</h1>
      <ul>
        {blogs.map(blog =>
          <li key={blog.id}> Blogin otsikko: {blog.title}, Blogin tekijä: {blog.author}, Blogin osoite: {blog.url}, Tykkäyksiä: {blog.likes} </li>
        )}
      </ul>
    </div>
  )
}


export default App