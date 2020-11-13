import React, { useState, useEffect } from 'react'

import Notification from './components/Notification'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

import blogService from './services/blogs'
import loginService from './services/login'



const App = () => {
  //blog content
  const [blogs, setBlogs] = useState([])
  //auth
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  //notifications
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('')
  
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

  const clearLoginForm = () => {
    setUsername('')
    setPassword('')
  }


  const showMessage = (messageText, type) => {
      setMessage(messageText)
      setMessageType(type)
      setTimeout(() => {
        setMessage('')
        setMessageType('')
      }, 4000)
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const userResponse = await loginService.login({username, password})
      window.localStorage.setItem('loggedBloglistUser', JSON.stringify(userResponse))
      blogService.setToken(userResponse.token)
      setUser(userResponse)
      clearLoginForm()
    } catch(exception) {
        showMessage('Wrong Credentials', 'error')
        clearLoginForm()
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBloglistUser')
    setUser(null)
    blogService.setToken(null)
    showMessage('User logged out', 'success')
    clearLoginForm()
  }

  const createBlog = async (newBlog) => {
    try {
      const blog = await blogService.create(newBlog)
      setBlogs(blogs.concat(blog))
      showMessage(`New Blog ${blog.title} added`, 'success')
    } catch(exception) {
      showMessage('Invalid os missing information on form', 'error')
    }
  }

  if(user === null){
    return (
      <form onSubmit={handleLogin}>
        <Notification message={message} messageType={messageType} />
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
      <Notification message={message} messageType={messageType} />
      <p>
        {user.name} is logged <button onClick={handleLogout}>Logout</button>
      </p>
      <h2>Create Blog</h2>
      <Togglable buttonName={'Create New Blog'}>
        <BlogForm createBlog={createBlog} />
      </Togglable>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App