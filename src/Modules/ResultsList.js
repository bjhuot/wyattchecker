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
  console.log(filtered)
  if (props.value === '') {
    return (
      <p>
        Enter a student's name in the search box above to detemine their JV or
        Novice eligibility.
      </p>
    )
  } else {
    return filtered.map((filteredStudent, index) => {
      return (
        <li key={index} className="result">
          {filteredStudent.name}
          <span>
            <span
              className={`eligibility ${filteredStudent.novice}`}
              id="novice"
            >
              Nov
            </span>
            <span className={`eligibility ${filteredStudent.jv}`} id="jv">
              JV
            </span>
            <span className={`eligibility ${filteredStudent.judge}`} id="judge">
              Judge
            </span>
          </span>
        </li>
      )
    })
  }
}

export default ResultsList
