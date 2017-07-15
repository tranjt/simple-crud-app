import React, { Component } from 'react';
import { NavLink, Route } from "react-router-dom";

import './App.css';
import GamesPage from "./GamesPage";
import GameFormPage from "./GameFormPage";

class App extends Component {
  render() {
    return (
      <div className="ui container">
        <div className="ui three item menu">
          <NavLink className="item" activeClassName="active" exact to="/">Home</NavLink>
          <NavLink className="item" activeClassName="active" exact to="/games">games</NavLink>
          <NavLink className="item" activeClassName="active" exact to="/games/new">Add New Games</NavLink>
        </div>

        <Route exact path="/games" component={GamesPage} />
        <Route exact path="/games/new" component={GameFormPage} />
        <Route path="/game/:_id" component={GameFormPage}/>
      </div>
    );
  }
}

export default App;
