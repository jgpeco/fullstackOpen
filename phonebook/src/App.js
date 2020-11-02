import React, { useState, useEffect } from 'react'
import Form from './components/Form'
import Person from './components/Person'
import Notification from './components/Notifcation'
import personsService from './services/persons'

const Filter = ({search, handleSearch}) => <div>search person: <input type="text" value={search} onChange={handleSearch}/></div>

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newPhone, setNewPhone] = useState('')
  const [search, setSearch] = useState('')
  const [showSearch, setShowSearch] = useState(false)
  const [notifcation, setNotification] = useState({message: '', type: 'neutral'})
 
  //fetching data from db.json
  useEffect(() => {
    personsService
      .getAll()
      .then(personsData => {
        setPersons(personsData)
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

  const displayNotifcation = (message, type) => {
    setNotification({message: message, type: type})
    setTimeout(() => setNotification({...notifcation, message: ''}), 4000)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newPerson = {
      name: newName,
      phone: newPhone,
    }
    
    const personOnList = persons.find((person) => person.name.toLowerCase() === newPerson.name.toLowerCase()) 
    if(personOnList){

      if(window.confirm(`${newPerson.name} is already on the list. Update it's number?`)){
        const updatedPerson = {...personOnList, phone: newPerson.phone}
        personsService
          .update(updatedPerson.id, updatedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== returnedPerson.id ? person : returnedPerson))
            displayNotifcation(`${newPerson.name} was updated!`, 'success')
            clearForm()
          })
          .catch(error => {
            
          })           
      }
      return null
    }
    
    personsService
      .create(newPerson)
      .then(responsePerson => {
        setPersons(persons.concat(responsePerson))
        clearForm()
        displayNotifcation(`${newPerson.name} was created!`, 'success')
      })
      .catch(error => {
        displayNotifcation(error.message, 'error')
      }) 

  }

  const deletePerson = (id) => {
    if(window.confirm('Do you really want to delete this person?')){
      personsService
      .deleteItem(id)
      .then(() => {
        setPersons(persons.filter(person => person.id !== id))
        displayNotifcation(`Person removed.`, 'success')
      })
      .catch(error => {
        displayNotifcation(error.message, 'error')
      }) 
    }
  }

  const searchedPersons = showSearch
  ? persons.filter(person =>  person.name.toLowerCase().includes(search.toLowerCase()))
  : persons

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification content={notifcation} />
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
        <Person 
          key={person.id} 
          person={person}
          handleDelete={() => deletePerson(person.id)} />
      )}
      </div>
    </div>
  )
}

export default App