import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
  const [selected, setSelected] = useState(0)
  //creates an array with the lenght of anecdotes
  //will be used to keep track of each anecdotes points
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))
  //anecdote of the day states
  const [mostVoted, setMostVoted] = useState(0)
  const [anecdoteDay, setDay] = useState(0)

  const getRandomInt = (min, max) => {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min)) + min;
  }


  const handleRandomNumber = () => {
    const randomIndex = getRandomInt(0, anecdotes.length)
    setSelected(randomIndex)
  }

  const handleVote = () => {
    const vote = [...votes]
    vote[selected] += 1
    setVotes(vote)
    //checking to see if anecdote has the most votes
    let checkVote = vote[selected]
    if (checkVote > mostVoted){
      setMostVoted(checkVote)
      setDay(selected)
    }
  }

  return (
    <>
    <div>
      <h1>Anecdote of the Day</h1>
      <p>{props.anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <br />
      <button onClick={handleVote}>vote</button>
      <button onClick={handleRandomNumber}>random anecdote</button>
    </div>
    <div>
      <h1>Anecdote with most votes</h1>
      <p>{props.anecdotes[anecdoteDay]}</p>
      <p>has {mostVoted} votes</p>
    </div>
    </>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)