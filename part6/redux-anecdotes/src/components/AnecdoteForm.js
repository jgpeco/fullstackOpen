import React from 'react'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { showNotification, hideNotification } from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const createNewAnecdote = (e) => {
        e.preventDefault()
        const newAnecdote = e.target.anecdote.value
        e.target.anecdote.value = ''
        dispatch(createAnecdote(newAnecdote))
        dispatch(showNotification('New Anecdote created succesfully!'))

        setTimeout(() => {  
            dispatch(hideNotification())
        }, 5000)
      }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={createNewAnecdote}>
                <div><input name='anecdote' type='text' /></div>
                <button type='submit'>create</button>
            </form>
        </div>
    )
}

export default AnecdoteForm