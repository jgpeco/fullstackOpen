import React from 'react'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

const AnecdoteForm = ({ createAnecdote, setNotification }) => {
    
    const createNewAnecdote = async (e) => {
        e.preventDefault()
        const anecdoteContent = e.target.anecdote.value
        e.target.anecdote.value = ''
        createAnecdote(anecdoteContent)
        setNotification('New Anecdote created succesfully!', 5000)
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

const mapDispatchToProps = {
    createAnecdote,
    setNotification,
}

export default connect(
    null,
    mapDispatchToProps
)(AnecdoteForm)