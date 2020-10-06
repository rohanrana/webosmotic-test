import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";
import MainApp from "../App";

import NotFound from "../containers/404/404";
import Home from "../containers/Home";
import "react-datepicker/dist/react-datepicker.css";

class Root extends Component {

  render() {

    return (
      <Router>
        <MainApp>
          <Switch>
            <Route exact path="/" component={Home} />
            {/* {----IF UNKONWN ROUTE HIT-----} */}
            <Route path="*" component={NotFound} />
          </Switch>
        </MainApp>
      </Router>
    );
  }
}

export default(Root);
