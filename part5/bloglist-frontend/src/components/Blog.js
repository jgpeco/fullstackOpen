import React, { useState } from 'react'

const Blog = ({ blog, updateBlog }) => {
  const [viewDetails, setViewDetails] = useState(false)
  
  const blogStyle = {
    marginBottom: '0.5rem',
    paddingTop: '0.5rem',
    border: '1px solid black'
  }

  const toggleView = () => setViewDetails(!viewDetails)
  const showDetails = {display: viewDetails ? '' : 'none'}

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
      </div>
    </div>
  )
}

export default Blog
