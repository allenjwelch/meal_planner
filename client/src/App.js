import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './views/Home';
import Meals from './views/Meals';
import logo from './logo.png';
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className = "app">
                <Switch>
                    <Route exact path="/" component={Home} />
                </Switch>
            <Footer/>
        </div>
      </Router>




    //   <div className="App">
    //     <header className="App-header">
    //       <img src={logo} className="App-logo" alt="logo" />
    //     </header>
    //   </div>
    );
  }
}

export default App;
