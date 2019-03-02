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
        // this.userLogin() //! TESTING - Bypassing localstorage to loading test user
        // this.checkStorage()
    }

    userLogin(user, pass) {
        if (this.state.newUser) {
            console.log('posting new user...')
            //TODO API.postUser()
            API.postNewUser(user, pass)
                .then(res => 
                    console.log(res.data)  
                    // this.setState({user: res.data, }, () => {
                    //     console.log(this.state.user, "state.user");
                    //     localStorage.setItem('user', this.state.user[0].id) 
                    // }) 
                ).catch(err => console.log(err))
            } else {
            console.log(user, pass)
            API.getUserByName(user, pass) 
                .then(res => 
                    // console.log(res)
                    !res.data.length ? document.getElementById('user-invalid').innerHTML = 'Username or password incorrect'
                    : this.setState({user: res.data, }, () => {
                        console.log(this.state.user, "state.user");
                        localStorage.setItem('user', this.state.user[0].id)
                    }) 
                ).catch(err => console.log(err))
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

    validateUser(e) {
        e.preventDefault(); 
        let userName = document.getElementById('user-name'); 
        let password = document.getElementById('user-password'); 
        if (!this.state.newUser) {
            let invalidMsg = document.getElementById('user-invalid'); 
            userName.value.length && password.value.length ? this.userLogin(userName.value, password.value) : invalidMsg.innerHTML ='Please fill out both username and password to sign in'; 
        } else {
            let invalidMsg = document.getElementById('user-invalid'); 
            let passwordConfirm = document.getElementById('user-password-confirm'); 

            if (userName.value.length && password.value.length && passwordConfirm.value.length) {
                console.log(password.value, passwordConfirm.value)
                if (password.value === passwordConfirm.value) {
                    this.userLogin(userName.value, password.value);
                } else {
                    invalidMsg.innerHTML ='Password entries must be identical'; 
                }
            } else {
                invalidMsg.innerHTML ='Please fill out both username and password to sign in'; 
            }
        }
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
                                        <p className="heading">Sign In</p>
                                        <p id="user-invalid"></p>
                                        <form action="">
                                            <input id="user-name" type="text" placeholder="Username"/>
                                            <input id="user-password" type="password" placeholder="Password"/>
                                            <button onClick={(e) => this.validateUser(e)}>Submit</button>
                                        </form>
                                        <p className="swap-sign-in" onClick={() => this.swapSignIn()}>New User?</p>
                                    </div>
                                : <div className="new-user">
                                        <p className="heading">Register</p>
                                        <p id="user-invalid"></p>
                                        <form action="">
                                            <input id="user-name" type="text" placeholder="Username"/>
                                            <input id="user-password" type="password" placeholder="Password"/>
                                            <input id="user-password-confirm" type="password" placeholder="Confirm Password"/>
                                            <button onClick={(e) => this.validateUser(e)}>Submit</button>
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
