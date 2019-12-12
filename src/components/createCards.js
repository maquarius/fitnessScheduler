import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Grid from "@material-ui/core/Grid";
import Editcustomer from "./Editcustomer";
import Button from "@material-ui/core/Button";

import Snackbar from "@material-ui/core/Snackbar";

import MenuItem from "@material-ui/core/MenuItem";
import { Menu } from "@material-ui/core";

function CreateCard() {
  const [customer, setCustomer] = useState([]);
  const [expanded, setExpanded] = React.useState(false);
  const [trainings, setTrainings] = useState([]);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const fetchCustomer = () => {
    fetch("https://customerrest.herokuapp.com/api/customers")
      .then(response => response.json())
      .then(data => setCustomer(data.content));
  };

  useEffect(() => {
    fetchCustomer();
  }, []);

  useEffect(() => {
    fetchTrainings();
  }, []);

  const useStyles = makeStyles(theme => ({
    card: {
      maxWidth: 345
    },
    media: {
      height: 0,
      paddingTop: "56.25%" // 16:9
    },
    expand: {
      transform: "rotate(0deg)",
      marginLeft: "auto",
      transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest
      })
    },
    expandOpen: {
      transform: "rotate(180deg)"
    },
    avatar: {
      backgroundColor: red[500]
    }
  }));

  const deleteCustomer = link => {
    if (window.confirm("Do you really want to delete this customer?")) {
      fetch(link, { method: "DELETE" })
        .then(res => fetchCustomer())
        .then(res => setMessage("customer deleted"))
        .then(res => setOpen(true))
        .catch(err => console.error(err));
    }
  };
  const handleExpandClick = () => {
    setExpanded(!expanded);
    Math.floor(Math.random() * 20);
  };

  const fetchTrainings = () => {
    fetch("https://customerrest.herokuapp.com/api/trainings")
      .then(response => response.json())
      .then(data => setTrainings(data.content));
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

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false);
  };

  const classes = useStyles();

  return (
    <div>
      <Grid container style={{ justifyContent: "center" }}>
        {customer.map(({ firstname, lastname, phone, links, email, city }) => (
          <Grid item style={{ padding: 15 }}>
            <Card className={classes.card} key={links[0].href}>
              <CardHeader
                avatar={
                  <Avatar aria-label="recipe" className={classes.avatar}>
                    {firstname.charAt(0) + lastname.charAt(0)}
                  </Avatar>
                }
                title={firstname + " " + lastname}
                subheader={"Phone: " + phone}
              />
              <CardMedia
                className={classes.media}
                image={require("./../assets/userPictures/" +
                  Math.floor(Math.random() * 9) +
                  ".jpg")}
                height="300"
                alt={"picture of" + firstname}
                title={firstname}
              />
              <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                  Email: {email} <br></br>City: {city}
                </Typography>
              </CardContent>
              <CardActions disableSpacing>
                <IconButton
                  className={clsx(classes.expand, {
                    [classes.expandOpen]: expanded
                  })}
                  onClick={handleExpandClick}
                  aria-expanded={expanded}
                  aria-label="show more"
                >
                  <ExpandMoreIcon />
                </IconButton>
              </CardActions>
              <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                  <Button
                    size="small"
                    color="secondary"
                    onClick={() => deleteCustomer(links[0].href)}
                  >
                    Delete
                  </Button>
                  <Editcustomer updateCustomer={updateCustomer} />
                </CardContent>
              </Collapse>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        message={message}
      />
    </div>
  );
}

export default CreateCard;
