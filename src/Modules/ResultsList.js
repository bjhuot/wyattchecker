import React from 'react'

const ResultsList = (props) => {
  const students = props.studentData

  if (props.value === '') {
    return (
      <p>
        Enter a student's name in the search box above to detemine their JV or
        Novice eligibility.
      </p>
    )
  } else if (students.length === 0 && props.value) {
    return <p>No results found yet.</p>
  } else {
    return students.map((filteredStudent, index) => {
      return (
        <li key={index} className="result">
          <span>{filteredStudent.name}</span>
          <span>
            <span
              title={`Student is ${
                filteredStudent.novElig === 'false'
                  ? 'not eligible'
                  : 'eligible'
              } to compete in novice.`}
              className={`eligibility ${filteredStudent.novElig}`}
              id="novice"
            >
              Nov
            </span>
            <span
              title={`Student is ${
                filteredStudent.jvElig === 'false' ? 'not eligible' : 'eligible'
              } to compete in JV.`}
              className={`eligibility ${filteredStudent.jvElig}`}
              id="jv"
            >
              JV
            </span>
            <span
              title={`Student is ${
                filteredStudent.judgeElig === 'false'
                  ? 'not eligible'
                  : 'eligible'
              } to judge.`}
              className={`eligibility ${filteredStudent.judgeElig}`}
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
