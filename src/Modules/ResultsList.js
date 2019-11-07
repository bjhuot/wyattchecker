import React from 'react'

const ResultsList = (props) => {
  const filtered = props.searchName(props.value)
  //   const pillColor = (filteredStudent) => {
  //     if (filteredStudent.jv === true) {
  //       document.querySelector('#jv').classList.add('badge-success')
  //     } else {
  //       document.querySelector('#jv').classList.add('badge-warning')
  //     }
  //     if (filteredStudent.novice === true) {
  //       document.querySelector('#nov').classList.add('badge-success')
  //     } else {
  //       document.querySelector('#nov').classList.add('badge-warning')
  //     }
  //   }

  return filtered.map((filteredStudent, index) => {
    return (
      <li
        key={index}
        className="list-group-item d-flex justify-content-between"
      >
        {filteredStudent.name}
        <span>
          <span
            className={`badge badge-pill ${filteredStudent.novice}`}
            id="novice"
          >
            Novice
          </span>
          <span
            className={`badge badge-pill ml-3 ${filteredStudent.jv}`}
            id="jv"
          >
            JV
          </span>
        </span>
      </li>
    )
  })
}

export default ResultsList
