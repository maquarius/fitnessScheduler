import React, { useState, useEffect } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import { CSVLink } from "react-csv";
import Grid from "@material-ui/core/Grid";
import Editcustomer from "./Editcustomer";
import Addcustomer from "./Addcustomer";

const Customers = () => {
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

  const columns = [
    { header: "First name", accessor: "firstname" },
    { header: "Last name", accessor: "lastname" },
    { header: "Street adress", accessor: "streetaddress" },
    { header: "Postcode", accessor: "postcode" },
    { header: "City", accessor: "city" },
    { header: "E-mail", accessor: "email" },
    { header: "Phone number", accessor: "phone" },
    {
      sortable: false,
      filterable: false,
      width: 100,
      Cell: row => (
        <Editcustomer updateCustomer={updateCustomer} customer={row.original} />
      )
    },
    {
      sortable: false,
      filterable: false,
      width: 100,
      accessor: "links[1].href",
      Cell: ({ value }) => (
        <Button
          size="small"
          color="secondary"
          onClick={() => deleteCustomer(value)}
        >
          Delete
        </Button>
      )
    }
  ];

  return (
    <div>
      <Grid container>
        <Grid item>
          <Addcustomer saveCustomer={saveCustomer} />
        </Grid>
        <Grid style={{ padding: 15, color: "black" }} item>
          <CSVLink style={{ color: "black" }} data={customer}>
            Export data
          </CSVLink>
        </Grid>
      </Grid>
      <ReactTable
        filterable={true}
        data={customer}
        columns={columns}
        defaultPageSize={10}
      />
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        message={message}
      />
    </div>
  );
};

export default Customers;
