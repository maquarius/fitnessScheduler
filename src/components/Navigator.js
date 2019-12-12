import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { MemoryRouter as Router } from "react-router";
import { Link as RouterLink } from "react-router-dom";
import Link from "@material-ui/core/Link";
import Customers from "./Customers";
import Trainings from "./Trainings";
import Home from "./Home";

const Navigator = () => {
  return (
    (
      <div>
        <AppBar position="static">
          <Toolbar>
            <IconButton edge="start" aria-label="menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="h6">Customer</Typography>
            <Typography variant="h6">Trainings</Typography>
            <Typography variant="h6">Home</Typography>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
      </div>
    ) /
    (
      <div>
        <Link component={Customers} to="/customers">
          With prop forwarding
        </Link>
        <br />
        <Link component={Trainings} to="/trainings">
          Without prop forwarding
        </Link>
        <Link component={Home} to="/">
          With prop forwarding
        </Link>
      </div>
    )
  );
};

export default Navigator;
