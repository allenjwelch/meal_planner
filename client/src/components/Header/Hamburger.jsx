import React, {Component} from "react";
import './style.css';

class Hamburger extends Component {

    constructor(props) {
        super(props);
    }

    state = {
        isOpen: 'close'
    }

    toggleOpen() {
        let css = (this.state.isOpen === "close") ? "open" : "close";
        this.setState({"isOpen":css});
        console.log(this.state.isOpen);
    }

    render() {

        return (
            <div id="nav-icon" className = {this.state.isOpen} onClick={this.toggleOpen.bind(this)}>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
        )
    }
}

export default Hamburger;
