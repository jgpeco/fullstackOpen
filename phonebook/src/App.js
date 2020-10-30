import React, { useState } from 'react'
import Form from './components/Form'

const Person = ({person}) => <p>{person.name} - {person.phone}</p>
const Filter = ({search, handleSearch}) => <div>search person: <input type="text" value={search} onChange={handleSearch}/></div>

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', phone: '040-123456' },
    { name: 'Ada Lovelace', phone: '39-44-5323523' },
    { name: 'Dan Abramov', phone: '12-43-234345' },
    { name: 'Mary Poppendieck', phone: '39-23-6423122' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newPhone, setNewPhone] = useState('')
  const [search, setSearch] = useState('')
  const [searchedPersons, setSearchedPersons] = useState([])

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
  }

  const handleSearch = (e) => {
    let q = e.target.value
    setSearch(q)
    const searchResult = persons.filter(person => {
      return person.name.toLowerCase().includes(q.toLowerCase())
    })
    setSearchedPersons(searchResult)
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
      {searchedPersons.length 
        ? searchedPersons.map((person) => <Person key={person.name} person={person} />)
        : persons.map((person) => <Person key={person.name} person={person} />)
      }
      </div>
    </div>
  )
}

export default App