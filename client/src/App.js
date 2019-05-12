import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Landingpage from "./components/LandingPage/Landingpage";
import Tweets from './components/Dashboard/Main/Tweets';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Landingpage} />
          <Route exact path="/tweets/:id" component={Tweets} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
