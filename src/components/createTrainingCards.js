import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Grid from "@material-ui/core/Grid";
import moment from "moment";

function CreateTrainingCard() {
  const [customer, setCustomer] = useState([]);
  const [expanded, setExpanded] = React.useState(false);
  const [trainings, setTrainings] = useState([]);

  const fetchCustomer = () => {
    fetch("https://customerrest.herokuapp.com/api/trainings")
      .then(response => response.json())
      .then(data => setTrainings(data.content));
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

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const fetchTrainings = () => {
    fetch("https://customerrest.herokuapp.com/api/trainings")
      .then(response => response.json())
      .then(data => setTrainings(data.content));
  };

  const classes = useStyles();

  return (
    <div>
      <Grid container style={{ justifyContent: "center" }}>
        {trainings.map(({ date, duration, activity, links, index }) => (
          <Grid item style={{ padding: 15 }}>
            <Card className={classes.card} key={index}>
              <CardHeader
                avatar={
                  <Avatar aria-label="recipe" className={classes.avatar}>
                    {activity.charAt(0)}
                  </Avatar>
                }
                action={
                  <IconButton aria-label="settings">
                    <MoreVertIcon />
                  </IconButton>
                }
                title={activity}
                subheader={
                  "Date: " +
                  moment(date).format("MMM Do YY") +
                  "\n Starting time: " +
                  moment(date).format("h:mm a")
                }
              />
              <CardMedia
                className={classes.media}
                image={require("./../assets/activityPictures/" +
                  activity +
                  ".jpeg")}
                height="300"
                alt={"picture of" + activity}
                title={activity}
              />
              <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                  Duration: {duration} minutes
                </Typography>
              </CardContent>
              <CardActions disableSpacing></CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default CreateTrainingCard;
