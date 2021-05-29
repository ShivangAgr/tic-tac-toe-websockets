import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./screens/Home";
import NewGame from "./screens/NewGame";
import LocalMatch from "./screens/LocalMatch";
import OnlineMatchInit from "./screens/OnlineMatchInit";
import JoinMatch from "./screens/JoinMatch";
import OnlineMatch from "./screens/OnlineMatch";
import "./App.css";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/new" component={NewGame} />
        <Route exact path="/local" component={LocalMatch} />
        <Route exact path="/join" component={JoinMatch} />
        <Route exact path="/online" component={OnlineMatchInit} />
        <Route path="/online/:matchID" component={OnlineMatch} />
        <Route exact path="/" component={Home} />
      </Switch>
    </Router>
  );
}

export default App;
