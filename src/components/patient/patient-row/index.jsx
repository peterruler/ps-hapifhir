import React from 'react'
import {
  useHistory,
} from "react-router-dom";

const QUESTIONNAIRE_ID = 1;
let PID = -1;

let GotoQuestionaireQNr =  (props) => {
  const history = useHistory();

  function handleClick() {
    document.getElementById("questionnaire-list").remove();
    //update PID consistency
    localStorage.setItem("patientPID",props.pid);
    localStorage.setItem("patientQID",QUESTIONNAIRE_ID);
    PID = props.pid;
    history.push("/questionnaire/" + PID + "/" + QUESTIONNAIRE_ID);
  }

  return (
    <button className="redirect-btn" type="button" onClick={handleClick}>
      #{props.pid} <span>&nbsp;|&nbsp;</span>{props.given} {props.name} - {props.birthDate}&nbsp;{props.gender}
    </button>
  );
}

let formatDate = (input) => {
  var datePart = input.match(/\d+/g),
  year = datePart[0],
  month = datePart[1], day = datePart[2];

  return day + '.' + month + '.' + year;
};


class PatientRow extends React.Component {
  
  render() {
    let birthDateString = "1848-01-01";
    if(typeof(this.props.birthDate) !== 'undefined') {
      birthDateString = this.props.birthDate;
    }

    const birthDate = formatDate(birthDateString);

    let gender;
    if(this.props.gender === 'male') {
      gender = 'männlich';
    } else if(this.props.gender === 'female') {
      gender = 'weiblich';
    } else {
      gender = 'other';
    }
    return(
      <li className="patient-item" style={{listStyleType: 'none'}}>
        <div className="media-body">
          <GotoQuestionaireQNr pid={this.props.id} name={this.props.name} given={this.props.given} birthDate={birthDate} gender={gender}/>
        </div>
      </li>
    )
  }
}

export default PatientRow
