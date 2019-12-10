import React from 'react'

const ResultsList = (props) => {
  const filtered = props.searchName(props.value)

  //SHOWS MODAL

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
          <span>{filteredStudent.name}</span>
          <span>
            <span
              title={`Student is ${
                filteredStudent.novice === 'elig-false'
                  ? 'not eligible'
                  : 'eligible'
              } to compete in novice.`}
              className={`eligibility ${filteredStudent.novice}`}
              id="novice"
            >
              Nov
            </span>
            <span
              title={`Student is ${
                filteredStudent.jv === 'elig-false'
                  ? 'not eligible'
                  : 'eligible'
              } to compete in JV.`}
              className={`eligibility ${filteredStudent.jv}`}
              id="jv"
            >
              JV
            </span>
            <span
              title={`Student is ${
                filteredStudent.judge === 'elig-false'
                  ? 'not eligible'
                  : 'eligible'
              } to judge.`}
              className={`eligibility ${filteredStudent.judge}`}
              id="judge"
            >
              Judge
            </span>
          </span>
        </li>
      )
    })
  }
}

export default ResultsList
