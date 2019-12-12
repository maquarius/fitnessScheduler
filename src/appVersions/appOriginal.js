import React from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import "./App.css";
import Customers from "./components/Customers";
import Trainings from "./components/Trainings";
import Home from "./components/Home";
import Navigator from "./components/Navigator";

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Link to="/">Home</Link>
          <Link to="/trainings">Trainings</Link>
          <Link to="/customers">Customers</Link>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/trainings/" component={Trainings} />
            <Route path="/customers/" component={Customers} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
