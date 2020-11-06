const dummy = (blogs) => {
    blogs
    return 1
}

const totalLikes = (blogs) => {
    return blogs.length ? blogs.reduce((acc, item) => item.likes + acc, 0) : 0
}

const favoriteBlog = (blogs) => {
    const mostLikes = blogs.reduce((acc, item) => {
        if(item.likes > acc) acc = item.likes
        return acc
    }, 0)

    return blogs.length ? blogs.find(blog => blog.likes === mostLikes) : {}
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}