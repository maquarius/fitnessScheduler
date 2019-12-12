import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import moment from "moment";
import "date-fns";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}));

export default function AddTraining(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [training, setTraining] = useState({
    date: Date("2019-12-12"),
    duration: 0,
    activity: "",
    customer: ""
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = event => {
    setTraining({ ...training, [event.target.name]: event.target.value });
  };

  const checkFormat = checkedTraining => {
    checkedTraining.date = moment.utc(checkedTraining.date);
    checkedTraining.customer =
      "https://customerrest.herokuapp.com/api/customers/" +
      checkedTraining.customer;
  };

  const addTraining = () => {
    checkFormat(training);
    props.saveTraining(training);
    handleClose();
  };

  return (
    <div style={{ margin: 10 }}>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Add Training
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">New Training</DialogTitle>
        <DialogContent>
          <DialogContentText>Add training details</DialogContentText>
          <TextField
            margin="dense"
            type="date"
            name="date"
            value={training.date}
            onChange={e => handleInputChange(e)}
            label="date"
            fullWidth
          />

          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">activity</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={training.activity}
              name="activity"
              label="activity"
              onChange={e => handleInputChange(e)}
            >
              <MenuItem value={"Zumba"}>Zumba</MenuItem>
              <MenuItem value={"Fitness"}>Fitness</MenuItem>
              <MenuItem value={"Gym training"}>Gym training</MenuItem>
              <MenuItem value={"Spinning"}>Spinning</MenuItem>
              <MenuItem value={"Jogging"}>Jogging</MenuItem>
            </Select>
          </FormControl>
          <TextField
            margin="dense"
            name="duration"
            value={training.duration}
            onChange={e => handleInputChange(e)}
            label="duration"
            fullWidth
          />
          <TextField
            margin="dense"
            name="customer"
            value={training.customer}
            onChange={e => handleInputChange(e)}
            label="customer id"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={addTraining} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
