import React, { useState, useEffect } from "react";

import Grid from "@material-ui/core/Grid";
import Snackbar from "@material-ui/core/Snackbar";

import CreateCard from "./createCards";
import Addcustomer from "./Addcustomer";

const Home = () => {
  const [customer, setCustomer] = useState([]);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const handleClose = (event, reason) => {
    setOpen(false);
  };

  useEffect(() => {
    fetchCustomer();
  }, []);

  //retrieves initially the customer data
  const fetchCustomer = () => {
    fetch("https://customerrest.herokuapp.com/api/customers")
      .then(response => response.json())
      .then(data => setCustomer(data.content));
  };

  const deleteCustomer = link => {
    if (window.confirm("Do you really want to delete this customer?")) {
      fetch(link, { method: "DELETE" })
        .then(res => fetchCustomer())
        .then(res => setMessage("customer deleted"))
        .then(res => setOpen(true))
        .catch(err => console.error(err));
    }
  };

  const saveCustomer = newCustomer => {
    fetch("https://customerrest.herokuapp.com/api/customers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newCustomer)
    })
      .then(res => fetchCustomer())
      .then(res => setMessage("Customer saved succesfully"))
      .then(res => setOpen(true))
      .catch(err => console.error(err));
  };

  const updateCustomer = (customer, link) => {
    fetch(link, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(customer)
    })
      .then(res => fetchCustomer())
      .catch(err => console.error(err));
  };

  return (
    <div>
      <h1>Your customers</h1>
      <Grid justify="center" alignItems="center" container>
        <Grid item>
          <Addcustomer saveCustomer={saveCustomer} />
        </Grid>
      </Grid>
      <CreateCard />
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        message={message}
      />
    </div>
  );
};

export default Home;
