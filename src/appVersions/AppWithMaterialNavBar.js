import React from "react";
import { browserRouter as Router, Route, Switch, Link } from "react-router-dom";
import "./App.css";
import Customers from "./components/Customers";
import Trainings from "./components/Trainings";
import Home from "./components/Home";
import Navigator from "./components/Navigator copy";

function App() {
  return (
    <div className="App">
      <browserRouter>
        <div>
          <Navigator />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/trainings/" component={Trainings} />
            <Route path="/customers/" component={Customers} />
          </Switch>
        </div>
      </browserRouter>
    </div>
  );
}

export default App;
