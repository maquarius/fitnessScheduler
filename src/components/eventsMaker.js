import React, { useState, useEffect } from "react";
import moment from "moment";

export default function MyCalendar() {
  const localizer = momentLocalizer(moment);
  const [event, setEvents] = useState({
    title: "",
    start: "",
    end: "",
    allDay: false,
    resource: ""
  });
  const [trainings, setTrainings] = useState([]);

  useEffect(() => {
    fetchTrainings();
  }, []);

  const fetchTrainings = () => {
    fetch("https://customerrest.herokuapp.com/api/trainings")
      .then(response => response.json())
      .then(data => setTrainings(data.content));
  };

  return <div></div>;
}
