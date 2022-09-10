import React from 'react';

import Questionnare01Covid19 from '../q1-covid19-symptoms/symtoms/';

import {
  BrowserRouter as Router,
  Switch,
  useHistory,
  Route,
  useParams
} from "react-router-dom";

let PID = -1;
const QUESTIONNAIRE_ID = 1;

function GotoQuestionaireQNr() {
  const history = useHistory();

  function handleClick() {
    document.getElementById("questionnaire-list").remove();
    history.push("/questionnaire/" + PID + "/" + QUESTIONNAIRE_ID);
  }

  return (
    <button id="redirect-btn" type="button" onClick={handleClick}>
      #1<span>&nbsp;|&nbsp;</span>Covid Fragebogen
    </button>
  );
}

class QuestionaireRow extends React.Component {

  componentDidMount() {
    PID = localStorage.getItem("patientPID");
    this.setState({ patient: JSON.parse(localStorage.getItem("patient"))})
  }

  render() {
    return(
    <Router>
    <ul id="questionnaire-list">
      <li className="list-item" style={{listStyleType: 'none'}}>
        <div className="list-body">
          #nr<span>&nbsp;|&nbsp;</span>Beschreibung
        </div>
      </li>
      <li style={{listStyleType: 'none'}}>
         <GotoQuestionaireQNr/>
      </li>
        </ul>
      <Switch>
        <Route path="/questionnaire/:patientId/:questionaireId">
          <QuestionaireQ1/>
        </Route>
      </Switch>
    </Router>
    )
  }
}

//Questionaires
function QuestionaireQ1() {
  let {questionaireId} = useParams();
  localStorage.setItem("patientQID", questionaireId);
  return <Questionnare01Covid19/>
}

export default QuestionaireRow
