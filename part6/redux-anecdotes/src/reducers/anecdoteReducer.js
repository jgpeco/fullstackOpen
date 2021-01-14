const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}


const initialState = anecdotesAtStart.map(asObject)

//action creators
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

const anecdoteReducer = (state = initialState, action) => {
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

    case 'CREATE-ANECDOTE':
      const newAnecdote = asObject(action.data)
      return [...state, newAnecdote]
    
    default: return state
  }
}

export default anecdoteReducer