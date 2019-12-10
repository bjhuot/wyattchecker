import React from 'react'

const Student = ({ student }) => {
  return (
    <div className="modal">
      <div className="student-info">
        <div className="header">
          {student.name}
          <span>&times;</span>
        </div>
        <div className="modal-body">
          <div>
            <span
              title={`Student is ${
                student.novice === 'elig-false' ? 'not eligible' : 'eligible'
              } to compete in novice.`}
              className={`eligibility modal ${student.novice}`}
              id="novice"
            >
              Nov
            </span>
            <span
              title={`Student is ${
                student.jv === 'elig-false' ? 'not eligible' : 'eligible'
              } to compete in JV.`}
              className={`eligibility modal ${student.jv}`}
              id="jv"
            >
              JV
            </span>
            <span
              title={`Student is ${
                student.judge === 'elig-false' ? 'not eligible' : 'eligible'
              } to judge.`}
              className={`eligibility modal ${student.judge}`}
              id="judge"
            >
              Judge
            </span>
          </div>
          //TOURNAMENT BREAKDOWN CHART .... can I even do this? Is there a point
          to this?
          <div className="tournament-chart"></div>
        </div>
      </div>
    </div>
  )
}

export default Student
