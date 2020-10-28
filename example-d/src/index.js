import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const History = ({allClicks}) => {
  if (allClicks.length === 0){
    return (
      <div>
        the app is used by pressing the buttons
      </div>
    )
  }

  return (
    <div>
      button press history: {allClicks.join(' ')}
    </div>
  )
}

const Button = ({handleClick, text}) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const App = () => {
  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)
  const [allClicks, setAllClicks] = useState([])

  const handleLeftClick = () => {
    setAllClicks(allClicks.concat('L'))
    setLeft(left + 1)
  }

  const handleRightClick = () => {
    setAllClicks(allClicks.concat('R'))
    setRight(right + 1)
  }

  return (
    <>
    {left}
    <Button handleClick={handleLeftClick} text='left' />
    {right}
    <Button handleClick={handleRightClick} text='right' />
    <History allClicks={allClicks} />
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));


