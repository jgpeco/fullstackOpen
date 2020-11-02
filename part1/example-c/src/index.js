import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Display = ({counter}) => <div>{counter}</div>


const Button = ({handleClick, text}) =>  (
    <button onClick={handleClick}>
      {text}
      </button>
  )


const App = () => {
  const [counter, setCounter] = useState(0)

  const increseByOne = () => setCounter(counter + 1)
  const decreaseByOne = () => setCounter(counter - 1)
  const setToZero = () => setCounter(0)
  
  return (
    <>
    <Display counter={counter} />
    <Button handleClick={increseByOne} text='plus'/>
    <Button handleClick={decreaseByOne} text='minus' />
    <Button handleClick={setToZero} text='zero' />
    </>
  )
}

ReactDOM.render(
    <App />,
  document.getElementById('root')
);


