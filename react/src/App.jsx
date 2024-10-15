import { useEffect, useState } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import './Style.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [messageType, setMessageType] = useState('')

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

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })
      setUser(user)
      setUsername('')
      setPassword('')
      setErrorMessage('Login successful!')
      setMessageType('success')
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
    } catch (exception) {
      setErrorMessage('wrong credentials')
      setMessageType('error')
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
    }
  }

  const blogForm = () => (
    <ul>
      {blogs.map(blog =>
        <li key={blog.id}> Blogin otsikko: {blog.title}, Blogin tekijä: {blog.author}, Blogin osoite: {blog.url}, Tykkäyksiä: {blog.likes} <button type="button" onClick={() => buttonHandler(blog.id)}>Poisa</button></li>
      )}
    </ul>
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

      <Notification message={errorMessage} type={messageType} />
      <h2>Login</h2>
      {!user && loginForm()}
      {user && <div>
        <p>{user.username} logged in</p>
      </div>
      }

      {user && blogForm()}
    </div>
  )
}


export default App