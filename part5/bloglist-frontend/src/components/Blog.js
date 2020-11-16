import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, updateBlog, deleteBlog, loggedUser }) => {
  const [viewDetails, setViewDetails] = useState(false)
  const [isOwner, setIsOwner] = useState(false)


  useEffect(() => {
    if(loggedUser.username && loggedUser.username === blog.user.username) {
      setIsOwner(true)
    }
  }, [])
  
  const blogStyle = {
    marginBottom: '0.5rem',
    paddingTop: '0.5rem',
    border: '1px solid black'
  }

  const toggleView = () => setViewDetails(!viewDetails)
  const showDetails = { display: viewDetails ? '' : 'none' }

  const handleLike = async () => {
    const blogWithUpdatedLike = {
      user: blog.user.id,
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      id: blog.id
    }
    await updateBlog(blogWithUpdatedLike)
  }

  const handleRemove = async () => {
    if(window.confirm('Are you sure you want to delete this blog? This action is irreversible')){
      const blogToDelete = {
        id: blog.id,
        user: blog.user.id,
      }
      await deleteBlog(blogToDelete)
    }
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} <button onClick={toggleView}>View Details</button>
      </div>
      <div style={showDetails}>
        <p>Author: {blog.author}</p>
        <p>URL: {blog.url}</p>
        {blog.user
          ? <p>Likes: {blog.likes} <button onClick={handleLike}>like</button></p>
          : null
        }
        {
          isOwner &&
          <p><button onClick={handleRemove}>Remove</button></p>
        }
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  loggedUser: PropTypes.object.isRequired,
  updateBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
}

export default Blog
