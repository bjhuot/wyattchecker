import React, { Component } from 'react'
import Input from './Input'
import MongoDB from './MongoDB'
import ResultsList from './ResultsList'
import logo from '../images/wwdl-logo.png'

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

  //   isJvEligible = (student) => {
  //     Object.values(student.seasons)
  //   }

  searchName = (student) => {
    return this.state.studentData.filter((student) => {
      const regex = new RegExp(this.state.nameInput, 'i')
      if (this.state.nameInput.length >= 3 && student.name.match(regex)) {
        return student
      } else {
        return undefined
      }
    })
  }

  render() {
    return (
      <div>
        <img src={logo} alt="Wilson Wyatt Debate League" id="logo" />
        <div className="container-fluid w-50">
          <div className="row">
            <MongoDB
              studentData={this.state.studentData}
              setStudentData={this.setStudentData}
            />
            <Input
              value={this.state.nameInput}
              handleInput={this.handleInput}
              studentData={this.state.studentData}
              searchName={this.searchName}
            />
          </div>
          <div className="row">
            <ul className="list-group list-group-flush w-100">
              <ResultsList
                studentData={this.state.studentData}
                searchName={this.searchName}
                value={this.state.nameInput}
              />
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Body
