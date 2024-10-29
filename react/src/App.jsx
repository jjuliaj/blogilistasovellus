import { useEffect, useState } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import './Style.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: ''
  });
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState('')

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    blogService
      .getAll()
      .then(initialBlogs => {
        setBlogs(initialBlogs)
      })
  }, [])


  const addBlog = async (event) => {
    event.preventDefault()
    const blogObject = {
      title: newBlog.title,
      author: newBlog.author,
      url: newBlog.url,
      likes: 0
    }

    try {
      const returnedBlog = await blogService.create(blogObject);
      setBlogs(blogs.concat(returnedBlog));
      setNewBlog({ title: '', author: '', url: '' });

      setMessage(`A new blog "${newBlog.title}" by ${newBlog.author} was added`)
      setMessageType('success')
      setTimeout(() => {
        setMessage(null)
      }, 3000)

    } catch (exception) {
      setMessage('Adding blog did not succeed.')
      setMessageType('error')
      setTimeout(() => {
        setMessage(null)
      }, 3000)
    }
  }

  const buttonHandler = (blogiid) => {
    blogService.remove(blogiid)
    blogService.getAll()
      .then(response => {
        setBlogs(response)
      })
  }

  const logout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const handleBlogChange = (event) => {
    const { name, value } = event.target;
    setNewBlog({ ...newBlog, [name]: value });
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)

      setUser(user)
      setUsername('')
      setPassword('')
      setMessage('Login successful!')
      setMessageType('success')
      setTimeout(() => {
        setMessage(null)
      }, 3000)
    } catch (exception) {
      setMessage('wrong credentials')
      setMessageType('error')
      setTimeout(() => {
        setMessage(null)
      }, 3000)
    }
  }

  const blogForm = () => (
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
      </form>
      <ul>
        {blogs.map(blog =>
          <li key={blog.id}> Blogin otsikko: {blog.title}, Blogin tekijä: {blog.author}, Blogin osoite: {blog.url}, Tykkäyksiä: {blog.likes} <button type="button" onClick={() => buttonHandler(blog.id)}>Poisa</button></li>
        )}
      </ul>
    </div>

  )

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )

  return (
    <div>
      <h1>Hieno bloki sovellus</h1>

      <Notification message={message} type={messageType} />
      <h2>Login</h2>
      {!user && loginForm()}
      {user && <div>
        <p>{user.username} logged in</p> <button onClick={logout}>logout</button>
      </div>
      }

      {user && blogForm()}
    </div>
  )
}


export default App