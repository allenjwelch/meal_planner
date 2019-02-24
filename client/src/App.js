import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Header from './components/Header';
import Footer from './components/Footer';
import SignIn from './views/SignIn';
import Meals from './views/Meals';
import logo from './logo.png';
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className = "app">
            {/* <SignIn /> */}
                <Switch>
                    <Route exact path="/" component={Meals} />
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
