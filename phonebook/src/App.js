import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Form from './components/Form'
import Person from './components/Person'

const Filter = ({search, handleSearch}) => <div>search person: <input type="text" value={search} onChange={handleSearch}/></div>

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newPhone, setNewPhone] = useState('')
  const [search, setSearch] = useState('')
  const [showSearch, setShowSearch] = useState(false)
 
  //fetching data from db.json
  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then((response) => {
        const persons = response.data
        setPersons(persons)
      })
  }, [])

  const handleNameInput = (e) => {
	  setNewName(e.target.value)	
  }

  const handlePhoneInput = (e) => {
    setNewPhone(e.target.value)
  }

  const clearForm = () => {
    setNewName('')
    setNewPhone('')
    setSearch('')
    setShowSearch(false)
  }

  const handleSearch = (e) => {
    setSearch(e.target.value)
    if(e.target.value) setShowSearch(true)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newPerson = {
      name: newName,
      phone: newPhone,
      }
      if(persons.find((person) => person.name === newPerson.name)){
          alert(`${newName} is already on the list!`)
          clearForm()
          return null
      }
    setPersons(persons.concat(newPerson))
    clearForm()
  }

  const searchedPersons = showSearch
  ? persons.filter(person =>  person.name.toLowerCase().includes(search.toLowerCase()))
  : persons

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter search={search} handleSearch={handleSearch} />
      <h2>Add a New Person</h2>
      <Form 
        handleSubmit={handleSubmit} 
        newName={newName} 
        newPhone={newPhone} 
        handleNameInput={handleNameInput} 
        handlePhoneInput={handlePhoneInput}
      />
      <h2>Numbers</h2>
      <div>
      {searchedPersons.map((person) => 
        <Person key={person.name} person={person} />
      )}
      </div>
    </div>
  )
}

export default App