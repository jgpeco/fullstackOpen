import React from 'react'
import { voteInAnecdote } from '../reducers/anecdoteReducer'
import { showNotification, hideNotification } from '../reducers/notificationReducer'
import { useSelector, useDispatch } from 'react-redux'

const AnecdoteList = () => {
    const anecdotes = useSelector(({ anecdotes }) => 
        anecdotes.sort((a, b) => {
        if(a.votes < b.votes) return 1
        if(a.votes > b.votes) return -1
        return 0
      }))
    const dispatch = useDispatch()

    const vote = (id) => {
        const anecdote = anecdotes.find(a => a.id === id)
        dispatch(voteInAnecdote(anecdote))
        dispatch(showNotification(`You voted for ${anecdote.content}`))

        setTimeout(() => {  
            dispatch(hideNotification())
        }, 5000)
    }

    return (
        <>
            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                <div>
                    {anecdote.content}
                </div>
                <div>
                    has {anecdote.votes}
                    <button onClick={() => vote(anecdote.id)}>vote</button>
                </div>
                </div>
            )}
        </>
    )
}

export default AnecdoteList