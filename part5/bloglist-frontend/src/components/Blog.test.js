import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
    const dummyBlog = {
        user: '6e4c0008d39e44c5b99c9168afad6f54',
        title: 'Test Title',
        author: 'Test Author',
        url: 'Test URL',
        likes: 0,
        id: '3bf99f78e42e411ca9bbf32649ec0d51',
    }
    
    const dummyLoggedUser = {
        username: 'root',
        name: 'test'
    }
    
    const updateBlog = jest.fn()
    const deleteBlog = jest.fn()
    
    let component
    
    beforeEach(() => {
        component = render(
            <Blog 
                blog={dummyBlog} 
                loggedUser={dummyLoggedUser} 
                updateBlog={updateBlog}
                deleteBlog={deleteBlog}
            />
        )
    })
    
    test(`when rendered, blog displays author and title, but doesn't display other details`, () => {
        expect(component.container).toHaveTextContent('Test Title')
    
        const div = component.container.querySelector('.blogItem-initialInfo')
        expect(div).toBeDefined()
        expect(div).toHaveTextContent('Test Title')
        const detailsDiv = component.container.querySelector('.blogItem-detailsInfo')
        expect(detailsDiv).toHaveStyle('display: none')
    })
    
    test('displays details of blog when button is clicked', () => {
        const detailsDiv = component.container.querySelector('.blogItem-detailsInfo')
        expect(detailsDiv).toHaveStyle('display: none')
        
        const button = component.getByText('View Details')
        fireEvent.click(button)

        expect(detailsDiv).not.toHaveStyle('display: none')
    })

    test('when clicked in like button, the correct handler is called', async () => {
        const likeButton = component.getByText('like')
        fireEvent.click(likeButton)
        await expect(updateBlog.mock.calls).toHaveLength(1)
        fireEvent.click(likeButton)
        await expect(updateBlog.mock.calls).toHaveLength(2)
    })
})