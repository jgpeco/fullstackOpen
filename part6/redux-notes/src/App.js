import { createStore } from 'redux'
import noteReducer from './reducers/noteReducer'

const store = createStore(noteReducer)

store.dispatch({
  type: 'NEW_NOTE',
  data: {
    content: 'state changes are made with actions',
    important: false,
    id: 2,
  }
})

store.dispatch({
  type: 'TOGGLE_IMPORTANCE',
  data: {
    id: 2,
  }
})

const generateId = () => Number((Math.random() * 1000000).toFixed(1))

const createNote = (content) => {
  return {
    type: 'NEW_NOTE',
    data: {
      content,
      important: false,
      id: generateId()
    }
  }
}

const toggleImportanceOf = (id) => {
  return {
    type: 'TOGGLE_IMPORTANCE',
    data: { id }
  }
}

const App = () => {
  const addNote = (e) => {
    e.preventDefault()
    const content = e.target.note.value
    e.target.note.value = ''
    store.dispatch(createNote(content))
  }

  const toggleImportance = (id) => {
    store.dispatch(toggleImportanceOf(id))
  }

  return (
    <div>
      <form onSubmit={addNote}>
        <input type="text" name="note"/>
        <button type="submit">Add Note</button>
      </form>
      <ul>
        {store.getState().map(note => 
          <li 
            key={note.id}
            onClick={() => toggleImportance(note.id)}  
          >
            {note.content} <strong>{note.important ? 'important' : ''}</strong>
          </li>
        )}
      </ul>
    </div>
  )
}

export default App;
