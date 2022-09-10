import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));


export default function SimpleSelect() {
  const classes = useStyles();
  const patient = JSON.parse(localStorage.getItem("patient"));
  const [gender,setGender] = React.useState(patient.gender);

  const handleChange = (event) => {
    setGender(event.target.value);
  };

  return (
    <div>
    <FormControl className={classes.formControl}>
        <InputLabel id="patient-simple-select-label">Geschlecht</InputLabel>
        <Select
          labelId="patient-simple-select-label"
          id="patient-select"
          value={gender}
          onChange={handleChange}
        >
          <MenuItem value={'male'}>männlich</MenuItem>
          <MenuItem value={'female'}>weiblich</MenuItem>
          <MenuItem value={'other'}>weitere</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
