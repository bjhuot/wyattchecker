import React from 'react'
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
            seasons: [student.Season],
            novice: false,
            jv: false,
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

        let filteredStudents = []
        //Condenses list to eliminate duplicate names
        sortedStudents.forEach((student) => {
          if (
            filteredStudents.find(({ name }) => name === student.name) ===
            undefined
          ) {
            filteredStudents.push(student)
          } else {
            let es = filteredStudents.find(({ name }) => name === student.name) //existing student
            es.tournaments.push(`${student.tournaments}`)
            if (
              es.seasons.find((season) => season === `${student.seasons}`) ===
              undefined
            ) {
              es.seasons.push(`${student.seasons}`)
            }
          }
        })
        props.setStudentData(filteredStudents)
      })
      .catch((err) => {
        console.error(err)
      })
  }

  window.onload = fetchStudentData
  return null
}

export default MongoDB
