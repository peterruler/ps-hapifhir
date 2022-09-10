import React from 'react'
import { TextField, Button} from "@material-ui/core";

import {
  useHistory
} from "react-router-dom";


const config = require('../../config/env-config.json');
const BASE_URI = config.base_uri;

let PID = -1;

let isEmpty = (obj) => {
  return Object.keys(obj).length === 0;
}

function GotoEditViewButton() {
  const hiddenElement = {'display':'none'};
  const history = useHistory();

  function handleClick() {
    history.push("/patient/" + PID);
  }

  return (
    <button id="redirect-btn" style={hiddenElement} type="button" onClick={handleClick}>
      Go to edit patient
    </button>
  );
}

class PatientSearch extends React.Component {
  constructor(props){
    super(props);
    this.state = {
       error: false,
       helperText :""
    }
  }
  performSearch = () => {
    let pid = document.getElementById("pid");
    /* local testing too small pids
    let val = pid.value;
    const regex = new RegExp("^([1-9]{1})?[0-9]{6}$");
    
  
    if(!regex.test(val)) {
      this.setState({"helperText":"Bitte numerische 6/7 stellige PID eingeben!"});
      this.setState({"error": true});
      return false;
    }
    */
  
    if(typeof(pid.value) !== 'undefined' && pid.value !== '') {

      PID = pid.value;
      fetch(BASE_URI + 'Patient/' + PID + '?_format=json&_pretty=true')
        .then((response) => {
            return response.json();
        })
        .then((result) => {
            if(!isEmpty(result) && result.resourceType === 'Patient') {
              localStorage.setItem("patient", JSON.stringify(result));

              this.setState({"helperText":""});
              this.setState({"error": false});
              //update PID consistency
              localStorage.setItem("patientPID",result.id);
              document.getElementById("redirect-btn").click();
            } else {
              //show error message
              this.setState({"helperText":"Patient mit dieser PID existiert nicht!"});
              this.setState({"error": true});
            }
        })
    } 
  }
  
  render() {
    let className = 'cls-search-patient';
    const marginSendBtn = {'marginTop': '15px'}
    return <div className={className}>
      <GotoEditViewButton/>
      <fieldset>
        <legend>Suche nach PID</legend>
      <TextField
          id="pid"
          label="Patienten-ID"
          style={{ margin: 8 }}
          placeholder=""
          margin="normal"
          helperText={this.state.helperText}
          error={this.state.error}
          InputLabelProps={{
            shrink: true,
          }}
        />
</fieldset>
<Button  onClick={this.performSearch} style={marginSendBtn} variant="contained" color="primary" id="search-patient-name" label="Suchen">Suche Patient</Button></div>   
  }
}

export default PatientSearch
