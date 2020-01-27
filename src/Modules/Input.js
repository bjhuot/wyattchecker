import React from 'react'

const Input = (props) => {
  //Search field performs a  reduce on the array searching the name fields, and returns those in the results list.

  function searchNames(e) {
    props.handleInput(e)
    props.studentSearch()
  }

  return (
    <input
      type="text"
      value={props.value}
      onChange={(e) => searchNames(e)}
      className="search"
      placeholder="Student's Name"
      aria-label="Search field for student's name"
    />
  )
}

export default Input
