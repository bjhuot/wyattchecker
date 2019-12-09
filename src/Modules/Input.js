import React from 'react'

const Input = (props) => {
  //Search field performs a  reduce on the array searching the name fields, and returns those in the results list.

  return (
    <input
      type="text"
      value={props.value}
      onChange={props.handleInput}
      className="search"
      placeholder="Student's Name"
      aria-label="Search field for student's name"
    />
  )
}

export default Input
