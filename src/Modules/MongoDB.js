import {
  Stitch,
  AnonymousCredential,
  RemoteMongoClient,
} from 'mongodb-stitch-browser-sdk'

const MongoDB = (props) => {
  function fetchStudentData() {
    const client = Stitch.initializeDefaultAppClient('eligibility-vhxqp')

    const db = client
      .getServiceClient(RemoteMongoClient.factory, 'mongodb-atlas')
      .db('students')

    client.auth
      .loginWithCredential(new AnonymousCredential())
      .then(() =>
        db
          .collection('students')
          .find()
          .asArray()
      )
      .then((docs) => {
        console.log('Found docs')
        console.log('[MongoDB Stitch] Connected to Stitch')
        //Standardizes student data
        const students = docs.map((student) => {
          const studentModel = {
            name: `${student.First} ${student.Last}`,
            tournaments: [`${student.Month} ${student.Year}`],
            //TODO: WHY CAN I NOT SET AN OBJECT IN SEASONS?!?!!?
            seasons: [student.Season],
            novice: 'badge-danger',
            jv: 'badge-danger',
          }
          return studentModel
        })
        //Sorts alphabetically
        const sortedStudents = students.sort((a, b) => {
          const nameA = a.name.toLowerCase()
          const nameB = b.name.toLowerCase()

          if (nameA < nameB) {
            return -1
          }
          if (nameA > nameB) {
            return 1
          }
          return 0
        })

        //Condenses list to eliminate duplicate names
        let filteredStudents = []

        sortedStudents.forEach((student) => {
          if (
            filteredStudents.find(({ name }) => name === student.name) ===
            undefined
          ) {
            filteredStudents.push(student)
          } else {
            let es = filteredStudents.find(({ name }) => name === student.name) //existing student
            es.tournaments.push(`${student.tournaments}`)
            //TODO: AAAAAAAAGH
            es.seasons.push(`${student.seasons}`)
            if (
              es.seasons.find((season) => season === `${student.seasons}`) ===
              undefined
            ) {
              es.seasons.push(`${student.seasons}`)
            }
          }
        })

        const studentSeasonCounts = filteredStudents.map((student) => {
          return student.seasons.reduce(function(obj, season) {
            if (!obj[season]) {
              obj[season] = 0
            }
            obj[season]++
            return obj
          }, {})
        })

        const reFilteredStudents = filteredStudents.map((student, index) => {
          student.seasons = studentSeasonCounts[index]
          return student
        })

        const finalStudents = reFilteredStudents.map((student) => {
          const eligibility = Object.values(student.seasons).reduce((a, b) => {
            if (b >= 3) {
              a++
            }
            return a
          }, 0)
          if (eligibility === 0) {
            student.novice = 'badge-success'
            student.jv = 'badge-success'
          } else if (eligibility <= 3) {
            student.jv = 'badge-success'
          }
          return student
        })
        props.setStudentData(finalStudents)
      })
      .catch((err) => {
        console.error(err)
      })
  }

  window.onload = fetchStudentData
  return null
}

export default MongoDB
