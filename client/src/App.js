import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Footer from './components/Footer';
import Home from './views/Home';
import AddMeal from './views/AddMeal';
import './App.css';

class App extends Component {cl
    render() {
        return (
            <Router>
                <div className="app">
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/add" component={AddMeal} />
                    </Switch>
                    <Footer />
                </div>
            </Router>
        );
    }
}

export default App;
