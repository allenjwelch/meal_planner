import React, {Component} from "react";
import API from '../../utils/API';
import logo from '../../logo.png';
import Meals from '../Meals';

import './style.css';

class Home extends Component {

    state = {
        user: '', 
        newUser: false,
    }

    componentDidMount() {
        this.getUser() //! TESTING - Bypassing localstorage to loading test user
        // this.checkStorage()
    }

    getUser() {
        if (this.state.newUser) {
            //TODO API.postUser()
        } else {
            API.getUserByName() //! TESTING - HARDCODED
                .then(res => 
                    this.setState({user: res.data, }, () => {
                        console.log(this.state.user, "state.user");
                        localStorage.setItem('user', this.state.user[0].id)
                    }))
                .catch(err => console.log(err))
        }
    }

    updateLastLogin() {
        //TODO API.updateLoginDate()
    }

    checkStorage() {
        if(localStorage.getItem('user')) {
            let uid = localStorage.getItem('user'); 
            console.log(uid); 
            //TODO API.getUserById
        } else {
            console.log('no user signed in')
        }
    }

    validateUser() {
        if (true) {

        }

        //TODO this.getUser()
    }

    swapSignIn() {
        this.state.newUser ? this.setState({newUser: false }) : this.setState({newUser: true});
    }

    signOut() {
        this.setState({user: false }, () => {
            localStorage.removeItem('user')
        });
    }

    render() {
        return (
            <div className="main">

                {
                    this.state.user ?
                        <div className = "access">
                            <Meals user={this.state.user}/>
                            <button className="signout-btn" onClick={() => this.signOut()}>Sign Out</button>
                        </div>


                    : <div className="no-access">
                        <section className="sign-in">
                            <img src={logo} className="logo" alt="logo" />
                            {
                                !this.state.newUser ?
                                    <div className="returning-user">
                                        <p>Sign In</p>
                                        <form action="">
                                            <input id="user-name" type="text" placeholder="User"/>
                                            <input id="user-password" type="password" placeholder="Password"/>
                                            <button onClick={() => this.validateUser()}>Submit</button>
                                        </form>
                                        <p className="swap-sign-in" onClick={() => this.swapSignIn()}>New User?</p>
                                    </div>
                                : <div className="new-user">
                                        <p>Register</p>
                                        <form action="">
                                            <input id="user-name" type="text" placeholder="User"/>
                                            <input id="user-password" type="password" placeholder="Password"/>
                                            <button onClick={() => this.validateUser()}>Submit</button>
                                        </form>
                                        <p className="swap-sign-in" onClick={() => this.swapSignIn()}>Returning User?</p>
                                </div>
                            }
                        </section>
                        <div className="overlay"></div>
                    </div>
                }

        
            </div>
        )
    }
};

export default Home;
