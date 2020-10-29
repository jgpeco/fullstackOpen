import React, { useState } from 'react'

const Person = ({person}) => <p>{person.name}</p>

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')

  const handleNameInput = (e) => {
	setNewName(e.target.value)	
  }

  const handleSubmit = (e) => {
	e.preventDefault()
	const newPerson = {
		name: newName,
    }
    if(persons.find(person => person.name === newPerson.newName)){
        alert(`${newName} is already on the list!`)
    }
	setPersons(persons.concat(newPerson))
	setNewName('')	
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input type='text' value={newName} onChange={handleNameInput}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
	    {persons.map((person) => <Person key={person.name} person={person} />)}
      </div>
    </div>
  )
}

export default App