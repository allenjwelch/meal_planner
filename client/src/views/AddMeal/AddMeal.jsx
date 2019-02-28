import React, {Component} from 'react'; 
import API from '../../utils/API';

import './style.css'; 

class AddMeal extends Component {

    state = {

    }

    componentDidMount() {
        this.checkStorage()
    }

    checkStorage() {
        if(localStorage.getItem('user')) {
            let user = localStorage.getItem('user'); 
            console.log('user:', user); 
        } else {
            console.log('no user signed in')
        }
    }

    render() {
        return (
            <div className="main">
                <h1>Add Meal</h1>

            </div>
        )
    }
}; 

export default AddMeal; 