import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { PrivateRoute } from './utils/privateRoute';
import  ColorList  from './components/ColorList';

import Login from "./components/Login";
import "./styles.scss";

function App() {
  return (
    <Router>
      <div className="App">
        <Route exact path="/" component={Login} />
        <PrivateRoute path='/bubbles'component={ColorList}/>
        {/* 
          Build a PrivateRoute component that will 
          display BubblePage when you're authenticated 
        */}
      </div>
    </Router>
  );
}

export default App;
