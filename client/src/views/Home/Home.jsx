import React, {Component} from "react";
import API from '../../utils/API';
import logo from '../../logo.png';
import Meals from '../Meals';

import './style.css';

class Home extends Component {

    state = {
        user: '', 
    }

    componentDidMount() {
        this.getUser()
    }

    getUser() {
        API.getUser()
            .then(res => 
                this.setState({user: res.data, }, () => {
                    console.log(this.state.user, "state.user"); 
                }))
            .catch(err => console.log(err))
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
                            <p>SignIn</p>
                            <form action="" method="POST">
                                <input type="text" placeholder="User"/>
                                <input type="password" placeholder="Password"/>
                                <input type="submit" value="Submit"/>
                            </form>
                        </section>
                        <div className="overlay"></div>
                    </div>
                }

        
            </div>
        )
    }
};

export default Home;
