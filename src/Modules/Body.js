import React, { Component } from 'react'
import Input from './Input'
import ResultsList from './ResultsList'
import logo from '../images/logo-wwdl-final.svg'
import {
  Stitch,
  AnonymousCredential,
  RemoteMongoClient,
} from 'mongodb-stitch-browser-sdk'
import moment from 'moment'

class Body extends Component {
  constructor(props) {
    super(props)
    this.state = {
      studentData: [],
      nameInput: '',
    }
  }

  handleInput = (e) => {
    this.setState({ nameInput: e.target.value })
  }

  setStudentData = (docs) => {
    this.setState({ studentData: docs })
  }

  //API CONNECTION//
  studentSearch = () => {
    const APP_ID = 'eligibility-vhxqp'

    const client = Stitch.hasAppClient(APP_ID)
      ? Stitch.getAppClient(APP_ID)
      : Stitch.initializeDefaultAppClient(APP_ID)

    const db = client
      .getServiceClient(RemoteMongoClient.factory, 'mongodb-atlas')
      .db('students')

    client.auth
      .loginWithCredential(new AnonymousCredential())
      .then((user) => db.collection('students3'))
      .then((docs) => {
        return docs
          .aggregate([
            {
              $match: {
                $and: [
                  //Limits to students
                  { Type: 'student' },
                  {
                    //Matches First and Last names (indexed) to search input
                    $text: {
                      $search: `${this.state.nameInput}`,
                    },
                  },
                ],
              },
            },
            {
              //Removes extraneous data
              $project: {
                _id: false,
                name: { $concat: ['$First', ' ', '$Last'] },
                event: ['$Timestamp', '$Event'],
                school: '$School',
              },
            },
          ])
          .toArray()
      })
      .then((docs) => {
        docs.map((doc) => {
          //Returns first year of academic year >> 2017 for 2017-2018
          const tournament = moment(doc.event[0], 'MM/DD/YY HH:mm')
          if (tournament.isAfter(`${tournament.year()}-08-01`)) {
            doc.event[0] = tournament.year()
          }
          if (tournament.isBefore(`${tournament.year()}-08-01`)) {
            doc.event[0] = tournament.year() - 1
          }
          return doc.event
        })
        let finalStudents = []
        docs.forEach((doc) => {
          let existingStudent = finalStudents.find(
            (student) => student.name === doc.name
          )
          if (existingStudent === undefined) {
            finalStudents.push(doc)
          } else if (existingStudent.name === doc.name) {
            existingStudent.event = existingStudent.event.concat(doc.event)
          }
        })
        // finalStudents.map((student) => {
        //   return (student.count = student.event.reduce((obj, item) => {
        //     if (!obj[item]) {
        //       obj[item] = 0
        //     }
        //     obj[item]++
        //     return obj
        //   }, {}))
        // })
        finalStudents.forEach((student) => {
          //ELIGIBILITY CHECKS
          //judgeElig
          const varsity = new RegExp('^V')
          let varsityCount = 0
          student.event.forEach((event) => {
            if (varsity.test(event)) {
              varsityCount++
            }
          })
          if (varsityCount >= 9) {
            student.judgeElig = 'true'
          } else {
            student.judgeElig = 'false'
          }

          //novElig, jvElig
          let years = student.event.filter((item) => typeof item === 'number')
          //novice check == checks for 3 or more tournament. a pass (TRUE) must set FALSE for novElig
          years = years.reduce((obj, item) => {
            if (!obj[item]) {
              obj[item] = 0
            }
            obj[item]++
            return obj
          }, {})
          const novice = Object.values(years).some((element) => element >= 3)
          if (!novice) {
            student.novElig = 'true'
          }
          if (novice) {
            student.novElig = 'false'
          }
          student.jvElig = 'true'
          console.log(novice, years)
        })
        this.setStudentData(finalStudents)
        console.log(finalStudents)
      })
  }
  //END API CONNECTION//

  render() {
    return (
      <div className="main">
        <img src={logo} alt="Wilson Wyatt Debate League" id="logo" />
        <Input
          value={this.state.nameInput}
          handleInput={this.handleInput}
          studentData={this.state.studentData}
          studentSearch={this.studentSearch}
        />
        <ul className="results">
          <ResultsList
            studentData={this.state.studentData}
            value={this.state.nameInput}
          />
        </ul>
      </div>
    )
  }
}

export default Body
