import React from 'react';
import PatientSearch from '../patient/patient-search';
import PatientList from '../patient/patients-list';     
import PatientDetail from '../patient/patient-detail';
import QuestionaireList from '../questionnaires/list';
import Overview from '../overview';
import Info from '../info';
import PatientSearchByName from '../patient/patient-search-by-name/search-form'
import Chart from "../stats/view";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
  useParams
} from "react-router-dom";

class PatientApp extends React.Component {

  render() {
    return (
      <Router>
        <div>
           <ul id="main-nav">
              <li>
               <NavLink id="start-link" to="/">Start</NavLink>
              </li>
             <li>
               <NavLink to="/start">Pidsuche</NavLink>
              </li>
             <li>
               <NavLink to="/patient-search">Patientensuche</NavLink>
            </li>
            <li>
               <NavLink to="/stats">Statistik</NavLink>
            </li>
            <li>
               <NavLink to="/info">Info</NavLink>
            </li>
          </ul>
          <Switch>
            <Route path="/stats">
              <Chart />
            </Route>
            <Route path="/questionnaire/:patientId">
              <QuestionaireLink/>
            </Route>
            <Route path="/patient/:patientId">
              <PatientCheck/>
            </Route>
            <Route path="/patient-search">
              <PatientSearchByName/>
            </Route>
            <Route path="/patient-list">
              <PatientList />
            </Route>
            <Route path="/patients">
              <PatientList/>
            </Route>
            <Route path="/info">
              <Info />
            </Route>
            <Route path="/start">
              <PatientSearch />
            </Route>
            <Route path="/">
              <Overview />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

let QuestionaireLink = () => {
  let {patientId} = useParams();
  localStorage.setItem("patientPID",patientId);
  return <QuestionaireList pid={patientId} />
}

let PatientCheck = () => {
  let {patientId} = useParams();
  return <PatientDetail pid={patientId}/>
}

export default PatientApp
