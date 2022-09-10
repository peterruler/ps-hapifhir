import React from 'react'
import QuestionaireRow from '../row'

class QuestionaireList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {patient:{}};
  }
  componentDidMount() {
    let patientObj = JSON.parse(localStorage.getItem("patient"));
    this.setState({ patient: patientObj })
  }

  render() {
    return (
      <div className="container-fluid">
          <QuestionaireRow pid={this.state.patient.id} no={1}/>
      </div>
    )
  }
}

export default QuestionaireList
