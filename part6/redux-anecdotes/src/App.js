import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { createAnecdote, voteInAnecdote } from './reducers/anecdoteReducer'

const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const vote = (id) => {
    const anecdote = anecdotes.find(a => a.id === id)
    dispatch(voteInAnecdote(anecdote))
  }

  const createNewAnecdote = (e) => {
    e.preventDefault()
    const newAnecdote = e.target.anecdote.value
    e.target.anecdote.value = ''
    dispatch(createAnecdote(newAnecdote))
  }

  return (
    <div>
      <h2>Anecdotes</h2>
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
      <h2>create new</h2>
      <form onSubmit={createNewAnecdote}>
        <div><input name='anecdote' type='text' /></div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default App