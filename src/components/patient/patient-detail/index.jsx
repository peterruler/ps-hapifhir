import React from 'react'
import 'date-fns';
import { TextField, Button} from "@material-ui/core";
import MaterialUIPickers from './date-picker';
import SimpleSelect from './patient-gender';
import {
  useHistory
} from "react-router-dom";

let PID = -1;

let choosePatient = () => {
  //console.info("Patient with pid=" + PID + " is chosen");
  document.getElementById("redirect-btn-q1").click();
}

function GotoQuestionaireListButton() {
  const hiddenElement = {'display':'none'};
  const history = useHistory();

  function handleClick() {
    history.push("/questionnaire/" + PID);
  }

  return (
    <button id="redirect-btn-q1" style={hiddenElement} type="button" onClick={handleClick}>
      Go to edit patient
    </button>
  );
}

function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}

class PatientDetail extends React.Component {
 
  constructor(props) {
    super(props);
    this.state = {patient:{}};
  }
  componentDidMount() {
    let patientObj = JSON.parse(localStorage.getItem("patient"));
    PID = patientObj.id;
    this.setState({ patient: patientObj })
  }
    render() {
      if(isEmpty(this.state.patient)) {
        return (<div>Patient ist leer!</div>);
      }
      const marginSendBtn = {'marginTop': '15px'}
        return (
      <div> 
        <GotoQuestionaireListButton/>
         <fieldset>
        <legend>Patient Prüfen</legend>
      <TextField
          id="pid"
          label="Patienten-ID"
          style={{ margin: 8 }}
          placeholder=""
          helperText=""
          margin="normal"
          value ={this.props.pid}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <br/>
         <TextField
          id="firstname"
          label="Vornamen"
          style={{ margin: 8 }}
          placeholder=""
          helperText=""
          margin="normal"
          value ={this.state.patient.name[0].given[0]}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <br/>
         <TextField
          id="lastname"
          label="Nachname"
          style={{ margin: 8 }}
          placeholder=""
          helperText=""
          margin="normal"
          value ={this.state.patient.name[0].family}
          InputLabelProps={{
            shrink: true,
          }}
        />   
        <br/>
         <MaterialUIPickers/>  
         <SimpleSelect/>
        </fieldset>
         <Button  onClick={choosePatient} style={marginSendBtn} variant="contained" color="primary" id="choose-patient" label="Suchen">Patient wählen</Button>  
        </div>
        )
  }
}
export default PatientDetail;
