import React from 'react'

//FALSE/INELIGIBLE == badge-danger, TRUE/ELIGIBLE == badge-success

const Student = (props) => {
  return (
    <li className="list-group-item">
      {props.filteredStudent.name}
      <span className="badge badge-pill" id="novice">
        Novice
      </span>
      <span className="badge badge-pill" id="jv">
        JV
      </span>
    </li>
  )
}

export default Student
