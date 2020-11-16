import React, { useState, useEffect, useRef } from 'react'
import Note from './components/Note'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import NoteForm from './components/NoteForm'
import LoginForm from './components/LoginForm'
import noteService from './services/notes'
import loginService from './services/login'


const Footer = () => {
  const footerStyle = {
    color: 'green',
    fontStyle: 'italic',
    fontSize: '1.2rem',
    display: 'flex',
    justifyContent: 'center',
    margin: '1.5rem'
  }

  return (
    <div style={footerStyle}>
      <br/>
      <em>Note app, Department of Pecosville</em>
    </div>
  )
}

const App = () => {
    const [notes, setNotes] = useState([])
    const [showAll, setShowAll] = useState(true)
    const [errorMessage, setErrorMessage] = useState(null)
    const [user, setUser] = useState(null)

    useEffect(() => {
      noteService
        .getAll()
        .then(initialNotes => {
          setNotes(initialNotes)
        })
    }, [])

    useEffect(() => {
      const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
      if(loggedUserJSON) {
        const user = JSON.parse(loggedUserJSON)
        setUser(user)
        noteService.setToken(user.token)
      }
    }, [])

    const noteFormRef = useRef()

    const addNote = (noteObj) => {
      noteFormRef.current.toggleVisibility()
      noteService
        .create(noteObj)
        .then(returnedNote => {
          setNotes(notes.concat(returnedNote))
        })
    }

    const toggleImportanceOf = (id) => {
      const note = notes.find(n => n.id === id)
      const changedNote = { ...note, important: !note.important }

      noteService
        .update(id, changedNote)
        .then(returnedNote =>
          setNotes(notes.map(note => note.id !== id ? note : returnedNote)))
        .catch(() => {
          setErrorMessage(
            `Note '${note.content}' was already removed from server`
          )
          setTimeout(() => setErrorMessage(null), 5000)
          setNotes(notes.filter(n => n.id !== id))
        })
    }

    const handleLogin = async (userObj) => {
      try {
        const user = await loginService.login(userObj)

        window.localStorage.setItem(
          'loggedNoteappUser', JSON.stringify(user)
        )
        noteService.setToken(user.token)
        setUser(user)
      } catch(exception) {
        setErrorMessage('Wrong Credentials')
        setTimeout(() => {
          setErrorMessage(null)
        }, 4000)
      }
    }

    const handleLogout = () => {
      window.localStorage.removeItem('loggedNoteappUser')
      noteService.setToken(null)
      setUser(null)
    }

    const notesToShow = showAll
      ? notes
      : notes.filter(note => note.important)

    const loginForm = () => (
        <Togglable buttonLabel='Login'>
          <LoginForm
              handleLogin={handleLogin}
            />
        </Togglable>
    )

    const noteForm = () => (
      <Togglable buttonLabel='New Note' ref={noteFormRef}>
        <NoteForm createNote={addNote} />
      </Togglable>
    )

    return (
      <div>
        <h1>Notes</h1>
        <Notification message={errorMessage} />
        {
          user === null
          ? loginForm()
          : <div>
            <p>{user.name} logged</p>
            {noteForm()}
            <button onClick={handleLogout}>Logout</button>
          </div>
        }
        <div>
          <button onClick={() => setShowAll(!showAll)}>
            show {showAll ? 'important' : 'all'}
          </button>
        </div>
        <ul>
          {notesToShow.map((note) =>
            <Note
              key={note.id}
              note={note}
              toggleImportance={() => toggleImportanceOf(note.id)}
            />
          )}
        </ul>
        <Footer />
      </div>
    )
  }

export default App