import React from 'react'
import { voteInAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

const AnecdoteList = ({ anecdotes, voteInAnecdote, setNotification}) => {
    const anecdotesArr = anecdotes

    const vote = async (id) => {
        const anecdote = anecdotesArr.find(a => a.id === id)
        voteInAnecdote(anecdote)
        setNotification(`You voted for ${anecdote.content}`, 5000)
    }

    return (
        <>
            {anecdotesArr.map(anecdote =>
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

const mapStateToProps = ({ filter, anecdotes }) => {
    if(anecdotes.length){
        const anecdotesArr = anecdotes.sort((a, b) => {
            if(a.votes < b.votes) return 1
            if(a.votes > b.votes) return -1
            return 0
        })

        if(filter) return { anecdotes: (anecdotesArr.filter(a => a.content.includes(filter)))}
        return { anecdotes: anecdotesArr }
    }
    return { anecdotes: [] }
}

const mapDispatchToProps = {
    voteInAnecdote,
    setNotification,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AnecdoteList)