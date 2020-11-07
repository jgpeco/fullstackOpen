const listHelper = require('../utils/list_helper')

const listWithNoBlogs = []
    const listWithOneBlog = [
        {
            title: `Peco's Blog`,
            author: `Peco`,
            url: `http://www.google.com`,
            likes: 3,
            id: `5fa596ccc40ae033681014e1`
          },
    ]
    const listWithBlogs = [
        {
            title: `Peco's Blog`,
            author: `Peco`,
            url: `http://www.google.com`,
            likes: 3,
            id: `5fa596ccc40ae033681014e1`,
        },
        {
            title: `Male's Blog`,
            author: `Male`,
            url: `http://www.facebook.com`,
            likes: 12,
            id: `5fa59a0e49b9df31c00c7d17`,
        },
        {
            title: `Male's Other Blog`,
            author: `Male`,
            url: `http://www.gmail.com`,
            likes: 8,
            id: `5fa6e2086c6f860fb4bf9d1`,
        },
        {
            title: `Male's More Blogs`,
            author: `Male`,
            url: `http://www.gmail.com`,
            likes: 5,
            id: `5fa6e2176c6f860fb4bf9d12`
        },
        {
            title: `Peco's Other Blog`,
            author: `Peco`,
            url: `http://www.gmail.com`,
            likes: 6,
            id: `5fa6e2266c6f860fb4bf9d13`
          }
    ]


test('dummy returns one', () => {
    expect(listHelper.dummy(listWithNoBlogs)).toBe(1)
})

describe('total likes', () => {
    test('of empty list is zero', () => {
        expect(listHelper.totalLikes(listWithNoBlogs)).toBe(0)
    })

    test('when list has only one blog equals the likes of that', () => {
        expect(listHelper.totalLikes(listWithOneBlog)).toBe(3)
    })

    test('of a bigger list is calculated right', () => {
        expect(listHelper.totalLikes(listWithBlogs)).toBe(34)
    })
})

describe('favorite blog', () => {
    test('of empty list is an empty obj', () => {
        expect(listHelper.favoriteBlog(listWithNoBlogs)).toEqual({})
    })

    test('of list with one blog to be that blog', () => {
        expect(listHelper.favoriteBlog(listWithOneBlog)).toEqual(listWithOneBlog[0])
    })

    test('when list of blog has more items, to be the most liked', () => {
        expect(listHelper.favoriteBlog(listWithBlogs)).toEqual(listWithBlogs[1])
    })
})

describe('most blogs', () => {
    test('of empty list is zero', () => {
        expect(listHelper.mostBlogs(listWithNoBlogs)).toBe(0)
    })

    test('when the list of blogs has one blog author', () => {
        const blogAuthor = listHelper.mostBlogs(listWithOneBlog)
        expect(blogAuthor.author).toBe('Peco')
    })

    test('when the list of blogs has more than one blog author', () => {
        const blogAuthors = listHelper.mostBlogs(listWithBlogs)
        expect(blogAuthors.author).toBe('Male')
        expect(blogAuthors.blogs).toBe(3)
    })
})

describe('most likes', () => {
    test('of empty list is zero', () => {
        expect(listHelper.mostLikes(listWithNoBlogs)).toBe(0)
    })

    test('when there is just one blog post', () => {
        const blogCreator = listHelper.mostLikes(listWithOneBlog)
        expect(blogCreator.author).toBe('Peco')
        expect(blogCreator.likes).toBe(3)
    })

    test('when there are several blog posts with different authors', () => {
        const blogCreator = listHelper.mostLikes(listWithBlogs)
        expect(blogCreator.author).toBe('Male')
        expect(blogCreator.likes).toBe(25)
    })
})