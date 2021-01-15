import React from 'react'
import { voteInAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useSelector, useDispatch } from 'react-redux'

const AnecdoteList = () => {
    const anecdotes = useSelector( ({ filter, anecdotes }) => {
        if(anecdotes.length){
            const anecdotesArr = anecdotes.sort((a, b) => {
                if(a.votes < b.votes) return 1
                if(a.votes > b.votes) return -1
                return 0
            })
    
            if(filter) return anecdotesArr.filter(a => a.content.includes(filter))
            return anecdotesArr
        }
        return []
    })
    
    const dispatch = useDispatch()

    const vote = async (id) => {
        const anecdote = anecdotes.find(a => a.id === id)
        dispatch(voteInAnecdote(anecdote))
        dispatch(setNotification(`You voted for ${anecdote.content}`, 5000))
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