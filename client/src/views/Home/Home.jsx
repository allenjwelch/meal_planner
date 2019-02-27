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
        this.getUser()
        // this.checkStorage()
    }

    getUser() {
        if (this.state.newUser) {
            // API.postUser()
        } else {
            API.getUser()
                .then(res => 
                    this.setState({user: res.data, }, () => {
                        console.log(this.state.user, "state.user");
                        localStorage.setItem('user', this.state.user[0].id)
                    }))
                // .then( localStorage.setItem('user', this.state.user[0]))
                .catch(err => console.log(err))
        }
    }

    checkStorage() {
        if(localStorage.getItem('user')) {
            let user = localStorage.getItem('user'); 
            console.log(user); 
        } else {
            console.log('no user signed in')
        }
    }

    validateUser() {
        if (true) {

        }


    }

    swapSignIn() {
        this.state.newUser ? this.setState({newUser: false }) : this.setState({newUser: true});
    }

    render() {
        return (
            <div className="main">

                {
                    this.state.user ?
                        <div className = "access">
                            {/* <h1>User Signed in</h1> */}
                            <Meals user={this.state.user}/>
                        </div>


                    : <div className="no-access">
                        <section className="sign-in">
                            <img src={logo} className="logo" alt="logo" />

                            {
                                !this.state.newUser ?
                                    <div className="returning-user">
                                        <p>SignIn</p>
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
