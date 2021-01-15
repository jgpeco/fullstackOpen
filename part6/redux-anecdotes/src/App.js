import React, { useEffect } from 'react'
import AnecdoteList from './components/AnecdoteList'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import Filter from './components/Filter'

//fetching data
import fetchHelper from './services/anecdotes'
import { useDispatch } from 'react-redux'
import { initializeAnecdotes } from './reducers/anecdoteReducer'

const App = () => {
  const dispatch = useDispatch()
  
  useEffect(() => {
    const fetchData = async () => {
      const initialAnecdotes = await fetchHelper.getAll()
      dispatch(initializeAnecdotes(initialAnecdotes))
    }
    fetchData()
  }, [dispatch])


  return (
    <div>
      <h2>Anecdotes</h2>
      <AnecdoteForm />
      <Notification />
      <Filter />
      <AnecdoteList />
    </div>
  )
}

export default App