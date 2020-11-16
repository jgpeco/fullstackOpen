import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent, waitFor } from '@testing-library/react'

import BlogForm from './BlogForm'

let component
const createBlog = jest.fn()


describe('<BlogForm />', () => {
    beforeEach(() => {
        component = render(
            <BlogForm createBlog={createBlog} />
        )
    })

    test.only('calls handler function with right info when submit', async () => {
        const titleInput = component.container.querySelector('#input-title')
        const authorInput = component.container.querySelector('#input-author')
        const urlInput = component.container.querySelector('#input-url')
        const form = component.container.querySelector('.blog-form')

        fireEvent.change(titleInput, { 
            target: { value: 'test title' }
        })
        fireEvent.change(authorInput, { 
            target:  { value: 'test author' }
        })
        fireEvent.change(urlInput, { 
            target: { value: 'test url' }
        })
        fireEvent.submit(form)

        await expect(createBlog.mock.calls).toHaveLength(1)
        expect(createBlog.mock.calls[0][0].title).toMatch('test title')
        expect(createBlog.mock.calls[0][0].author).toMatch('test author')
    })
})