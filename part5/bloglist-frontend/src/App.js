import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  //blog content
  const [blogs, setBlogs] = useState([])
  //blog form
  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')
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

  const clearLoginForm = () => {
    setUsername('')
    setPassword('')
  }

  const clearBlogForm = () => {
    setBlogTitle('')
    setBlogAuthor('')
    setBlogUrl('')
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
        setErrorMessage('Wrong Credentials')
        clearLoginForm()
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
    clearLoginForm()
    clearBlogForm()
  }

  const createBlog = async (e) => {
    e.preventDefault()
    try {
      const blog = await blogService.create({
        title: blogTitle,
        author: blogAuthor,
        url: blogUrl
      })
      setBlogs(blogs.concat(blog))
      clearBlogForm()
    } catch(exception) {
      setErrorMessage('Invalid or Missing Blog Information')
      clearBlogForm()
      setTimeout(() => {
        setErrorMessage('')
      }, 4000)
    }
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
      <p>
        {user.name} is logged <button onClick={handleLogout}>Logout</button>
      </p>
      <h2>Create Blog</h2>
      <form onSubmit={createBlog}>
        <div>
          title: <input 
            type="text"
            value={blogTitle}
            name='blogTitle'
            onChange={({ target }) => setBlogTitle(target.value)}
          />
        </div>
        <div>
          author: <input 
            type="text"
            value={blogAuthor}
            name='blogAuthor'
            onChange={({ target }) => setBlogAuthor(target.value)}
          />
        </div>
        <div>
          url: <input 
            type="text"
            value={blogUrl}
            onChange={({ target}) => setBlogUrl(target.value)}
          />
        </div>
        <button type='submit'>Create New Blog</button>
      </form>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App