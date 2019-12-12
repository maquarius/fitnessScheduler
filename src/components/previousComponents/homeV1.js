import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
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
import { red } from "@material-ui/core/colors";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";

const Home = () => {
  //Code from the material-ui card example
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
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  // my own code for this card page
  const [customer, setCustomer] = useState([]);

  useEffect(() => {
    fetchCustomer();
  }, []);

  useEffect(() => {
    makeCards();
  }, []);

  //retrieves initially the customer data
  const fetchCustomer = () => {
    fetch("https://customerrest.herokuapp.com/api/customers")
      .then(response => response.json())
      .then(data => setCustomer(data.content));
  };

  const makeCards = () => {
    var output = "";
    for (let i = 0; i < customer.length; i++) {
      output += (
        <Card className={classes.card}>
          <CardHeader
            avatar={
              <Avatar aria-label="recipe" className={classes.avatar}>
                {customer[i].firstname.charAt(0) +
                  customer[i].lastname.charAt(0)}
              </Avatar>
            }
            action={
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            }
            title={customer[i].firstname + " " + customer[i].lastname}
            subheader={"Phone: " + customer[i].phone}
          />
          <CardMedia
            className={classes.media}
            image={"/userPictures/" + i}
            title={customer.firstname}
          />
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              {customer.links[2].href}
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
              <Typography paragraph>Method:</Typography>
            </CardContent>
          </Collapse>
        </Card>
      );
    }
    document.getElementById("output").innerHTML = output;
  };

  return (
    <div>
      <h1>Welcome, Trainer</h1>
      <div id="output"></div>
    </div>
  );
};

export default Home;
