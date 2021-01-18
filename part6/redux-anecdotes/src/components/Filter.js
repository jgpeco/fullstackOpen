import React from 'react'
import { connect } from 'react-redux'
import { setFilter } from '../reducers/filterReducer'

const Filter = ( {setFilter} ) => {

  const handleChange = (e) => {
    console.log('change', e.target.value)
    setFilter(e.target.value)
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

export default connect(
  null,
  { setFilter }
)(Filter)