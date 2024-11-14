import { useEffect, useState } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import './Style.css'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Blog from './components/Blog'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState('')
  const [blogFormVisible, setBlogFormVisible] = useState(false)

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


  const addBlog = (blogObject) => {
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setMessage(`A new blog "${blogObject.title}" by ${blogObject.author} was added`)
        setMessageType('success')
        setTimeout(() => {
          setMessage(null)
        }, 3000)
        setBlogFormVisible(false)
      }).catch(() => {
        setMessage('Failed to add blog')
        setMessageType('error')
        setTimeout(() => {
          setMessage(null)
        }, 3000)
      })
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

  const blogForm = () => (
    <div>
      {!blogFormVisible && (
        <button onClick={() => setBlogFormVisible(true)}>new blog</button>
      )}
      {blogFormVisible && (
        <BlogForm
          createBlog={addBlog}
          toggleVisibility={() => setBlogFormVisible(false)}
        />
      )}
    </div>
  )

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

  const loginForm = () => {
    return (
      <div>
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
        />
      </div>
    )
  }

  return (
    <div>
      <h1>Hieno bloki sovellus</h1>

      <Notification message={message} type={messageType} />

      {!user && loginForm()}

      {user && <div>
        <p>{user.username} logged in</p> <button onClick={logout}>logout</button>
      </div>
      }

      {user && blogForm()}

      {user && blogs.map(blog =>
        <Blog key={blog.id} blog={blog} buttonHandler={buttonHandler} />
      )}

    </div>
  )
}


export default App