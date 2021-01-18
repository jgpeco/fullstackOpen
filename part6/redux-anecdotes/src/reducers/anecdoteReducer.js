import fetchHelper from '../services/anecdotes'

//action creators
export const initializeAnecdotes = () => {
  return async dispatch => {
    const initialAnecdotes = await fetchHelper.getAll()
    dispatch({
      type: 'INIT-ANECDOTES',
      data: initialAnecdotes
    })
  }
}

export const createAnecdote = (anecdoteContent) => {
  return async dispatch => {
    const newAnecdote = await fetchHelper.createNew(anecdoteContent)
    dispatch({
      type: 'CREATE-ANECDOTE',
      data: newAnecdote,
    })
  }
}

export const voteInAnecdote = (anecdote) => {
  return async dispatch => {
    const votedAnecdote = await fetchHelper.vote(anecdote)
    dispatch({
      type: 'VOTE',
      data: votedAnecdote,
    })
  }

}

const anecdoteReducer = (state = [], action) => {

  switch(action.type) {
    case 'VOTE':
      const aToVote = action.data
      return state.map(a => a.id === aToVote.id ? aToVote : a )
    
    case 'INIT-ANECDOTES':
      return action.data
    
    case 'CREATE-ANECDOTE':
      return [...state, action.data]
    
    default: return state
  }
}

export default anecdoteReducer