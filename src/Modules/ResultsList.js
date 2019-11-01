import React from 'react'
import Student from './Student'

const ResultsList = (props) => {
  let filtered = props.searchName(props.value)

  // return filtered.map((filteredStudent) => {
  //   return <Student />
  // })
  console.log(filtered)
  return null
}

export default ResultsList
