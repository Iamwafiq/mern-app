import React from 'react';
//import './App.css';
import CreateUser from "./createuser";

import ViewUser from "./view";

//import MainPage from './Routes/MainPage/mainPage';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

function App() {
  return (
    <Router>
          <Switch>
            
            <Route exact path="/">
              <CreateUser />
            </Route>   
            <Route exact path="/allusers">
              <ViewUser />
            </Route>   
          </Switch>
     
    </Router>
    
  );
}

export default App;
