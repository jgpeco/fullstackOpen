import React, { useState } from 'react'

const Blog = ({ blog }) => {
  const [viewDetails, setViewDetails] = useState(false)
  
  const blogStyle = {
    marginBottom: '0.5rem',
    paddingTop: '0.5rem',
    border: '1px solid black'
  }

  const toggleView = () => setViewDetails(!viewDetails)
  const showDetails = {display: viewDetails ? '' : 'none'}

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} <button onClick={toggleView}>View Details</button>
      </div>
      <div style={showDetails}>
        <p>Author: {blog.author}</p>
        <p>URL: {blog.url}</p>
        <p>Likes: {blog.likes} <button>like</button></p>
      </div>
    </div>
  )
}

export default Blog
