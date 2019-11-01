import React, { Component } from 'react'
import Input from './Input'
import MongoDB from './MongoDB'

class Body extends Component {
  constructor(props) {
    super(props)
    this.state = {
      studentData: [],
      searchJV: false,
      searchNov: false,
      nameInput: '',
    }
  }

  handleInput = (e) => {
    this.setState({ nameInput: e.target.value })
  }

  setStudentData = (docs) => {
    this.setState({ studentData: docs })
  }

  //REDUCTION LOGIC

  //isEligibleJV = () => {}

  //   isEligibleNovice = (data) => {
  //     const nov = data.reduce((a, b) => (a !== b ? (b = [b]) : b.push(a)))
  //     console.log(nov)
  //   }

  //REDUCE NAMES

  //   reduceName = (list) => {
  //     return list.reduce((prev, current) => {
  //       if (prev.name === current.name) {
  //         return current
  //       } else {
  //         return prev
  //       }
  //     }, '')
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
      <div className="container">
        <MongoDB
          studentData={this.state.studentData}
          setStudentData={this.setStudentData}
        />
        <Input
          value={this.state.nameInput}
          handleInput={this.handleInput}
          studentData={this.state.studentData}
          searchName={this.searchName}
          reduceName={this.reduceName}
        />
      </div>
    )
  }
}

export default Body
