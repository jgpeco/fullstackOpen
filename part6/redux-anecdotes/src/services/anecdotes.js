import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const createNew = async ( anecdote ) => {
    const newAnecdote = { content: anecdote, votes: 0 }
    const response = await axios.post(baseUrl, newAnecdote)
    return response.data
}

const vote = async ( anecdote ) => {
    const votedAnecdote = {...anecdote, votes: anecdote.votes + 1}
    const response = await axios.put(`${baseUrl}/${anecdote.id}`, votedAnecdote)
    return response.data
}


export default { getAll, createNew, vote }