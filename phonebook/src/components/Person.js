import React from 'react'

const Person = ({person, handleDelete}) => (
    <div>
        <p>{person.name} - {person.phone}</p>
        <button onClick={handleDelete}>delete</button>
    </div>
)

export default Person