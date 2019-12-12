import React, { useState, useEffect } from "react";
import CreateTrainingCard from "./createTrainingCards";
import AddTraining from "./AddTraining";

import Grid from "@material-ui/core/Grid";
const Trainings = () => {
  const [training, setTraining] = useState([]);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const handleClose = (event, reason) => {
    setOpen(false);
  };

  useEffect(() => {
    fetchTraining();
  }, []);

  const fetchTraining = () => {
    fetch("https://customerrest.herokuapp.com/api/trainings")
      .then(response => response.json())
      .then(data => setTraining(data.content));
  };

  const deleteTraining = link => {
    if (window.confirm("Do you really want to delete this customer?")) {
      fetch(link, { method: "DELETE" })
        .then(res => fetchTraining())
        .then(res => setMessage("Training deleted"))
        .then(res => setOpen(true))
        .catch(err => console.error(err));
    }
  };

  const saveTraining = newTraining => {
    fetch("https://customerrest.herokuapp.com/api/trainings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newTraining)
    })
      .then(res => fetchTraining())
      .then(res => setMessage("Training saved succesfully"))
      .then(res => setOpen(true))
      .catch(err => console.error(err));
  };

  const updateTraining = (training, link) => {
    fetch(link, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(training)
    })
      .then(res => fetchTraining())
      .catch(err => console.error(err));
  };

  return (
    <div>
      <Grid justify="center" alignItems="center" container>
        <Grid item>
          <AddTraining saveTraining={saveTraining} />
        </Grid>
      </Grid>
      <CreateTrainingCard />
    </div>
  );
};

export default Trainings;
