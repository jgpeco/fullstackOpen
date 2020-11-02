import React from 'react'

const Form = ({handleSubmit, newName, newPhone, handleNameInput, handlePhoneInput}) => {
    return (
        <form onSubmit={handleSubmit}>
            <div>
                name: <input type='text' value={newName} onChange={handleNameInput}/>
            </div>
            <div>
                number: <input type='text' value={newPhone} onChange={handlePhoneInput} />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
         </form>
    )
}

export default Form