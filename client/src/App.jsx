import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { IndexClients } from "./cmp/index";
import { AddClient } from "./cmp/addClient";
import { Home } from "./cmp/home";
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/add" component={AddClient} />
          <Route path="/show" component={IndexClients} />
          <Route path="/" component={Home} />

        </Switch>
      </div>
    </Router>

  );
}

export default App;
