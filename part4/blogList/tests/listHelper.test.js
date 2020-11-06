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
        expect(listHelper.totalLikes(listWithBlogs)).toBe(15)
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