import React, {Component} from "react";
import './style.css';
import Hamburger from "./Hamburger.jsx";
import MediaQuery from 'react-responsive';

class Header extends Component {

    constructor(props) {
        super(props);
    }

    state = {
        showDropdown: 'hidden'
    }

    toggleDropdown() {
        let css = (this.state.showDropdown === "hidden") ? "show" : "hidden";
        this.setState({"showDropdown":css});
    }



    render() {

        return (

            <div className = "header">
                <h1 id="headerLogo">Header</h1>

                <nav className = "navigation">
                    <MediaQuery minWidth={1026}>
                        <ul className = "navList">
                            <li className = "navLink"><a href = "/home">Home</a></li>
                            <li className = "navLink"><a href = "/courses">Courses</a></li>
                            <li className = "navLink"><a href = "/calendar">Calendar</a></li>
                            <li className = "navLink"><a href = "/resources">Resources</a></li>
                        </ul>
                    </MediaQuery>

                    <MediaQuery maxWidth={1026}>
                        <div id = "mobile-drop" onClick={this.toggleDropdown.bind(this)}>
                            <Hamburger/>
                            <ul id ="navList-drop" className={this.state.showDropdown}>
                                <li className = "navLink-drop"><a href = "/home">Home</a></li>
                                <li className = "navLink-drop"><a href = "/courses">Courses</a></li>
                                <li className = "navLink-drop"><a href = "/calendar">Calendar</a></li>
                                <li className = "navLink-drop"><a href = "/resources">Resources</a></li>
                            </ul>
                        </div>
                    </MediaQuery>

                </nav>
            </div>
        )
    }
}

export default Header;
