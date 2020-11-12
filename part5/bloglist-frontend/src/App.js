import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  //content
  const [blogs, setBlogs] = useState([])
  //auth
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  //errors
  const [errorMessage, setErrorMessage] = useState('')
  
  useEffect(async () => {
    const blogs = await blogService.getAll()
    setBlogs(blogs)
  }, [])

  useEffect(() => {
    const loggedUser = JSON.parse(window.localStorage.getItem('loggedBloglistUser'))
    if(loggedUser){
      setUser(loggedUser)
      blogService.setToken(loggedUser.token)
    }
  }, [])

  const clearForm = () => {
    setUsername('')
    setPassword('')
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const userResponse = await loginService.login({username, password})
      window.localStorage.setItem('loggedBloglistUser', JSON.stringify(userResponse))
      blogService.setToken(userResponse.token)
      setUser(userResponse)
      clearForm()
    } catch(exception) {
        setErrorMessage('Wrong Credentials')
        clearForm()
        console.log(errorMessage)
        setTimeout(() => {
          setErrorMessage('')
        }, 4000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBloglistUser')
    setUser(null)
    blogService.setToken(null)
    clearForm()
  }

  if(user === null){
    return (
      <form onSubmit={handleLogin}>
        <div>
          Username: 
          <input 
            type="text"
            value={username}
            name='username'
            onChange={(e) => setUsername(e.target.value)}
            />
        </div>
        <div>
          Password:
          <input 
            type="text"
            value={password}
            name='password'
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <p>{user.name} is logged</p>
      <button onClick={handleLogout}>Logout</button>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App