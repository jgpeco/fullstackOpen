import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Stat = ({text, value}) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
)
    
const Statistics = ({statistics}) => {
  const [good, neutral, bad, allScores, avg, positive] = statistics

  if(allScores < 1) {
    return (
      <div>
        <h2>Statistics</h2>
        <p>No feedback given yet.</p>
      </div>
    )
  }
  return (
    <div>
      <h2>Statistics</h2>
      <table>
        <tbody>
        <Stat text='good' value={good} />
        <Stat text='neutral' value={neutral} />
        <Stat text='bad' value={bad} />
        <Stat text='all ratings' value={allScores} />
        <Stat text='avg' value={avg.toFixed(3)} />
        <Stat text='positive' value={positive.toFixed(2)} />
        </tbody>
      </table>
    </div>
  )
}

const Button = ({handleClick, text}) => <button onClick={handleClick}>{text}</button>

const App = () => {
  //save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [allScores, setAll] = useState(0)
  const [avg, setAvg] = useState(0)
  const [positive, setPositive] = useState(0)


  const positivePercentage = (all, positiveScore) => (positiveScore * 100) / all
  const findAvg = (all, goodScores, badScores) => {
    if(all === 0) return 1;
    return ((goodScores * 1) + (badScores * -1)) / all
  }

  const handleGoodClick = () => {
    setAll(allScores + 1)
    setGood(good + 1)
    setPositive(positivePercentage(allScores + 1, good + 1))
    setAvg(findAvg(allScores + 1, good + 1, bad))
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
    setAll(allScores + 1)
    setPositive(positivePercentage(allScores + 1, good))
    setAvg(findAvg(allScores + 1, good, bad))
  }

  const handleBadClick = () => {
    setBad(bad + 1)
    setAll(allScores + 1)
    setPositive(positivePercentage(allScores + 1, good))
    setAvg(findAvg(allScores + 1, good, bad + 1))
  }

  const statisticsArr = [good, neutral, bad, allScores, avg, positive]

  return (
    <>
    <div>
      <h2>give feedback</h2>
      <Button handleClick={handleGoodClick} text='good' />
      <Button handleClick={handleNeutralClick} text='neutral' />
      <Button handleClick={handleBadClick} text='bad' />
    </div>
    <Statistics statistics={statisticsArr} />
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));

