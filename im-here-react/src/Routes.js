import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Location from "./Location";
import Map from "./Map";

const Routes = () => {
  return (
    <div>
      <Router>
        <Route exact path="/" component={Location}></Route>
        <Route exact path="/map" component={Map}></Route>
      </Router>
    </div>
  );
};

export default Routes;
