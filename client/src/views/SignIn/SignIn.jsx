import React, {Component} from "react";
import logo from '../../logo.png';

import './style.css';

const SignIn = () => (
    <div>
        <section className="sign-in">
            <img src={logo} className="logo" alt="logo" />
            <p>SignIn</p>
            <form action="" method="POST">
                <input type="text" placeholder="User"/>
                <input type="password" placeholder="Password"/>
                <input type="submit" value="Submit"/>
            </form>
        </section>

        <div className="overlay"></div>
    </div>
);

export default SignIn;
