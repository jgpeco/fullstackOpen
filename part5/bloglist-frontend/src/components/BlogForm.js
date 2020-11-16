import React, { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {
    const [blogTitle, setBlogTitle] = useState('')
    const [blogAuthor, setBlogAuthor] = useState('')
    const [blogUrl, setBlogUrl] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        const newBlog = {
            title: blogTitle,
            author: blogAuthor,
            url: blogUrl
        }
        await createBlog(newBlog)
        setBlogTitle('')
        setBlogAuthor('')
        setBlogUrl('')
    }   

    return (
    <form onSubmit={handleSubmit} className='blog-form'>
        <div>
          title: <input 
            type="text"
            id='input-title'
            value={blogTitle}
            name='blogTitle'
            onChange={({ target }) => setBlogTitle(target.value)}
          />
        </div>
        <div>
          author: <input 
            type="text"
            id='input-author'
            value={blogAuthor}
            name='blogAuthor'
            onChange={({ target }) => setBlogAuthor(target.value)}
          />
        </div>
        <div>
          url: <input 
            type="text"
            id='input-url'
            value={blogUrl}
            onChange={({ target }) => setBlogUrl(target.value)}
          />
        </div>
        <button type='submit'>Create New Blog</button>
      </form>
    )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
}

export default BlogForm