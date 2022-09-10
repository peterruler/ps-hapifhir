import React from 'react';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import { Button} from "@material-ui/core";

const CONFIG = require('../config/env-config.json');
const PATH = CONFIG.base_uri;

let createSampleData = () => {
  const questionnaireJSON = require('../config/questoinnaire.json');
  questionnaireJSON.url = "https://hapi.fhir.org/baseR4/Questionnaire/2569991?_pretty=true";
  const URL = PATH + 'Questionnaire?_format=json&_pretty=true';
  fetch(URL, {//NOTE: Cached http:// protocol leads to error
    method: 'POST', // or 'PUT'
    headers: {
    'Content-Type': 'application/fhir+json;charset=utf-8',
    },
    body: JSON.stringify(questionnaireJSON),
})
.then(response => response.json())
.then(data => {
  let pruleid = data.id;
  alert("Success, the generated rule id is: " + pruleid);
  localStorage.setItem("QuestionnaireRuleID", pruleid);
})
.catch((error) => {
    alert("Erstellen der Qwestionnaire Resource fehlgeschlagen! Error: " + error + " " + URL);
});
}

class Overview extends React.Component {
  componentDidMount() {

    let a2 = document.createElement('a');
    a2.href = "/patient-search";//fix to have correct url
    a2.textContent = 'Patientensuche & Questionnaire';
    a2.target = "_self";
    document.querySelector('#a2').appendChild(a2);

    /*
    let a3 = document.createElement('a');
    a3.href = "http://kswcdr.ddns.net:9000";
    a3.textContent = 'Studientool';
    a3.target = "_blank";
    a3.rel = "noreferrer";
    document.querySelector('#a3').appendChild(a3);
    */

    let a4 = document.createElement('a');
    a4.href = PATH.replace('baseR4/','');
    a4.textContent = 'Hapi FHIR Server';
    a4.target = "_blank";
    a4.rel = "noreferrer";
    document.querySelector('#a4').appendChild(a4);

  }
    render() {
      const marginSendBtn = {'marginTop': '15px'}
        return (
                <ul id="vert-nav">
                  <li>
                  <Button  onClick={createSampleData} style={marginSendBtn} variant="contained" color="primary" id="choose-patient" label="Suchen">Erstelle Questionnaire Ressource</Button>  
                  </li>
                  <li>
                   <span className="arrow"><ArrowRightIcon/>&nbsp;</span>
                   <span id="a2"></span>
                  </li>
                 {/*
                  <li>
                   <span className="arrow"><ArrowRightIcon/>&nbsp;</span>
                   <span id="a3"></span>
                  </li>
                 */}
                  <li>
                   <span className="arrow"><ArrowRightIcon/>&nbsp;</span>
                   <span id="a4"></span>
                  </li>
                </ul>
                );
    }
}
export default Overview;