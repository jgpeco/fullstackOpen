import React, { useState } from 'react'

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
    <form onSubmit={handleSubmit}>
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
    )
}

export default BlogForm