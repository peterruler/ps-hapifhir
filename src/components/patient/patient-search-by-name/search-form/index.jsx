import React from 'react'
import { TextField, Button } from "@material-ui/core";
import BirthdayDatePicker from '../date-picker';
import { addLoader, removeLoader } from './preloader';
import {
  useHistory
} from "react-router-dom";
import { createBrowserHistory } from "history";

const config = require('../../../config/env-config.json');
const BASE_URI = config.base_uri;

class PatientSearchByName extends React.Component {
  constructor(props) {
    super(props);
    this.history = createBrowserHistory();;
    this.state = {
      error: false,
      helperText: ""
    }
  }

  performSearch = () => {
    var searchSegments = [];
    let buildSearchSegments = (searchSegments, name, value) => {
      if (value) {
        searchSegments.push(name + "=" + value);
      }
      return searchSegments;
    }
    const name2 = document.getElementById("name").value;
    if (name2 == "" || name2.length < 3) {

      alert("Bitte einen Namen eingeben!");
      return false;
    }
    searchSegments = buildSearchSegments(searchSegments, "name", document.getElementById("name").value);
    searchSegments = buildSearchSegments(searchSegments, "birthdate", document.getElementById("birthdate").value);
    let searchString = encodeURI(searchSegments.join("&"));

    addLoader();
    fetch(BASE_URI + 'Patient?' + searchString + "&_pretty=true")
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        removeLoader();
        if (result && typeof (result.entry) !== 'undefined') {
          let pid = result.entry[0].resource.id;
          localStorage.setItem("patients", JSON.stringify(result.entry));
          localStorage.setItem("patientPID", pid);
          document.getElementById("redirect-to-list-btn").click();
        } else {
          console.error("Search didn't return a result!");
        }
      })
  }

  render() {
    let className = 'cls-search-patient';
    const marginSendBtn = { 'marginTop': '15px' }
    return (
      <div className={className}>
        <GotoListRedirect />
        <fieldset>
          <legend>Suche</legend>
          <ul>
            <li>
              <TextField
                name="name"
                id="name"
                label="Nachname (oder  Vorname)"
                style={{ margin: 8 }}
                margin="normal"
                placeholder="z.B. Hans"
                helperText={this.state.helperText}
                error={this.state.error}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </li>
            <li>
              <BirthdayDatePicker />
            </li>
          </ul>
        </fieldset>
        <Button onClick={this.performSearch} style={marginSendBtn} variant="contained" color="primary" id="search-patient-name" label="Suchen">Suche Patient</Button></div>
    )
  }
}

let GotoListRedirect = () => {
  const hiddenElement = { 'display': 'none' };
  const history = useHistory();

  let handleClick = () => {
    history.push("/patient-list/");
  }

  return (
    <button id="redirect-to-list-btn" style={hiddenElement} type="button" onClick={handleClick}>
      Go to patient-list
    </button>
  );
}
export default PatientSearchByName
