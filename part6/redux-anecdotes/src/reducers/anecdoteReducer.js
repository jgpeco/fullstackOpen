//action creators
export const initializeAnecdotes = (anecdotes) => {
  return {
    type: 'INIT_ANECDOTES',
    data: anecdotes,
  }
}

export const createAnecdote = (anecdote) => {
  return {
    type: 'CREATE-ANECDOTE',
    data: anecdote,
  }
}

export const voteInAnecdote = (anecdote) => {
  return {
    type: 'VOTE',
    data: anecdote,
  }
}

const anecdoteReducer = (state = [], action) => {
  console.log('anecdote state now: ', state)
  console.log('anecdote action', action)

  switch(action.type) {
    case 'VOTE':
      const anecdoteToVote = action.data
      return state
            .map(a => {
              if(a.id === anecdoteToVote.id){
                return {...anecdoteToVote, votes: anecdoteToVote.votes + 1}
              }
              return a
          })
    
    case 'INIT_ANECDOTES':
      return action.data
    
    case 'CREATE-ANECDOTE':
      return [...state, action.data]
    
    default: return state
  }
}

export default anecdoteReducer