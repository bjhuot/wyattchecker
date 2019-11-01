import React from 'react'
import ResultsList from './ResultsList'

const Input = (props) => {
  //Search field performs a  reduce on the array searching the name fields, and returns those in the results list.

  return (
    <div className="input-group">
      <input
        type="text"
        value={props.value}
        onChange={props.handleInput}
        className="form-control"
        placeholder="Student's Name"
        aria-label="Search field for student's name"
      />
      <ul className="list-group list-group-flush">
        <ResultsList
          studentData={props.studentData}
          searchName={props.searchName}
          value={props.value}
        />
      </ul>
    </div>
  )
}

export default Input
