import React, {Component} from "react";
import API from '../../utils/API';
import logo from '../../logo.png';
import Meals from '../Meals';

import './style.css';

class Home extends Component {

    state = {
        user: '', 
        newUser: false,
        currentDate: '',
        updateMeals: false,
    }

    componentDidMount() {
        // this.userLogin() //! TESTING - Bypassing localstorage to loading test user
        this.getDate();
        this.checkStorage(); // Check local storage if user is still logged in
    }

    getDate() { // gets the current login time to add or update a user's info
        let date = new Date();
        date.setTime(date.getTime())
        this.setState({ currentDate: date }, () => {
            // console.log(this.state.currentDate); 
        })
    }

    checkDate() { // checks user's last login date to determine if a new meal plan is needed
        console.log('checking date..')
        let lastLogin = new Date(this.state.user[0].last_logged); 
        let currentDay = new Date();
        let lastWeek = new Date(); 
        let lastLoginInt = lastLogin.getDay(); 
        let currentDayInt = currentDay.getDay(); 
        lastWeek.setTime(currentDay.getTime() - (1 * 7 * 24 * 60 * 60 * 1000));

        if (lastLogin <= lastWeek) { // if the last login was over a week ago, a new meal plan should be created
            console.log('UPDATE meals: ', `${lastLogin} <= ${lastWeek}`);
            this.setState({updateMeals: true }, () => {
                console.log(this.state.updateMeals, "state.updateMeals");
            }) 
        } else if (currentDayInt < lastLoginInt) { // or if the last login was in the previous week, a new meal plan should be created
            console.log('UPDATE meals: ', `${currentDayInt} < ${lastLoginInt}`);
            this.setState({updateMeals: true }, () => {
                console.log(this.state.updateMeals, "state.updateMeals");
            }) 
        } else {
            console.log('Dont UPDATE meals: lastlogin = ', lastLogin);
            // console.log(`${lastLogin} > ${lastWeek} || ${currentDayInt} >= ${lastLoginInt}`);
            // console.log(this.state.updateMeals, "state.updateMeals")
        }

        this.updateLastLogin(currentDay)
    }

    userLogin(user, pass, currentDate) {
        if (this.state.newUser) {
            // console.log('posting new user...')
            API.postNewUser(user, pass, currentDate)
                .then(res => {
                    if(!res.data) {
                        // console.log('nope..')
                        document.getElementById('user-invalid').innerHTML = 'Username is already in use'; 
                    } else {
                        // console.log(res)
                    }
                }).then (
                    API.getUserByName(user, pass) 
                    .then(res => 
                        !res.data.length ? document.getElementById('user-invalid').innerHTML = 'Username or password incorrect'
                        : this.setState({user: res.data, }, () => {
                            // console.log(this.state.user, "state.user");
                            localStorage.setItem('user', this.state.user[0].id)
                            this.checkDate()
                        }) )
                ).catch(err => console.log(err))
            } else {
            API.getUserByName(user, pass) 
                .then(res => 
                    !res.data.length ? document.getElementById('user-invalid').innerHTML = 'Username or password incorrect'
                    : this.setState({user: res.data, }, () => {
                        // console.log(this.state.user, "state.user");
                        localStorage.setItem('user', this.state.user[0].id)
                        this.checkDate()
                    }) )
                .catch(err => console.log(err))
        }
    }

    updateLastLogin(currentDay) { // modifies user info and updates with current date for last login
        API.updateLoginDate(this.state.user[0].id, currentDay)
            .then(res => {
                // console.log(res.data)
            })
    }

    checkStorage() {
        if(localStorage.getItem('user')) { // if local storage exists...
            let uid = localStorage.getItem('user'); 
            API.getUserById(uid)  // get user info from db using the uid from local storage
                .then(res => 
                    this.setState({user: res.data, }, () => {
                        this.checkDate()
                    }) 
                ).catch(err => console.log(err))
        } else {
            console.log('no user signed in')
        }
    }

    validateUser(e) {
        e.preventDefault(); 
        let userName = document.getElementById('user-name'); 
        let password = document.getElementById('user-password'); 
        if (!this.state.newUser) { // returning users
            let invalidMsg = document.getElementById('user-invalid'); 
            userName.value.length && password.value.length ? this.userLogin(userName.value, password.value, this.state.currentDate) : invalidMsg.innerHTML ='Please fill out both username and password to sign in'; 
        } else { // register new user
            let invalidMsg = document.getElementById('user-invalid'); 
            let passwordConfirm = document.getElementById('user-password-confirm'); 

            if (userName.value.length && password.value.length && passwordConfirm.value.length) {
                if (password.value === passwordConfirm.value) {
                    this.userLogin(userName.value, password.value, this.state.currentDate);
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



    render() {
        return (
            <div className="main">

                {
                    this.state.user ?
                        <div className = "access">
                            <Meals user={this.state.user} updateMeals={this.state.updateMeals}/>
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
