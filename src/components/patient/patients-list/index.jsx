import React from 'react'
import PatientRow from '../patient-row'
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";

import Questionnare01Covid19 from '../../questionnaires/q1-covid19-symptoms/symtoms/';

class PatientsList extends React.Component {

  componentDidMount() {
  }

  render() {
    let patients = JSON.parse(localStorage.getItem("patients"));
 
    return (
      <Router>
      <Switch>
      <Route path="/patient-list/">
      <div className="container-fluid">
        <ul id="questionnaire-list" className="media-list">
           { 
           patients.map((patient) => {
            return <PatientRow key={patient.resource.id}
            id={patient.resource.id}
            ressourceType={patient.resource.ressourceType}
            name={patient.resource.name[0].family+" "+ patient.resource.name[0].given}
            birthDate={patient.resource.birthDate}
            gender={patient.resource.gender}/>
           })
          }
        </ul>
      </div>
      </Route>
      <Route path="/questionnaire/:patientId/:questionaireId">
        <Questionnare01Covid19/>
        </Route>
        </Switch>
        </Router>
    )
  }
}
export default PatientsList
