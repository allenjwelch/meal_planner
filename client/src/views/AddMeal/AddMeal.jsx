import React, {Component} from 'react'; 
import API from '../../utils/API';

import './style.css'; 

class AddMeal extends Component {

    state = {
        userID: '',
    }

    componentDidMount() {
        this.checkStorage()
    }

    checkStorage() {
        if(localStorage.getItem('user')) {
            let user = localStorage.getItem('user'); 
            console.log('user:', user); 
            this.setState({ userID : user }, () => {
                console.log(this.state.userID, "state.userID")
            })
        } else {
            console.log('no user signed in')
        }
    }

    add() {
        
        if(document.getElementById('meal-name').value && document.getElementById('meal-prep').value) {
            console.log('has name')
            if(isNaN(document.getElementById('meal-prep').value)) {
                console.log('NOT a number')
                document.getElementById('invalid-time').innerHTML = 'Please enter a valid number for Prep Time in minutes'; 
            } else {
                console.log('number');
                
                let newMeal = {
                    meal: document.getElementById('meal-name').value, 
                    prep_time: document.getElementById('meal-prep').value, 
                    ingred1: document.getElementById('meal-ingred-1').value, 
                    ingred2: document.getElementById('meal-ingred-2').value, 
                    ingred3: document.getElementById('meal-ingred-3').value, 
                    ingred4: document.getElementById('meal-ingred-4').value, 
                    ingred5: document.getElementById('meal-ingred-5').value, 
                }
    
                API.postNewMeal(this.state.userID, newMeal)
                    .then(res => 
                        console.log('resdata: ', res.data)  
                        // this.setState({user: res.data, }, () => {
                        //     console.log(this.state.user, "state.user");
                        //     localStorage.setItem('user', this.state.user[0].id) 
                        // }) 
                    ).catch(err => console.log(err))
    
                console.log(newMeal); 
            }
        } else {
            document.getElementById('invalid-time').innerHTML = 'Please enter both a name and prep time for your meal'; 
        }

       

        // document.getElementById('invalid-time').innerHTML= ''; 
        // document.querySelector('form').reset();
    }

    render() {
        return (
            <div className="main">

                {
                    this.state.userID ?

                    <div className="add-meal-container">
                        <h1 className="add-title">Add a Meal</h1>
                        <form className="add-meal">
                            <div className="add-left">
                                <label htmlFor="meal-name">Meal Name</label>
                                <input type="text" id="meal-name"/>
                            </div>
                            <div className="add-right">
                                <label htmlFor="meal-prep">Prep Time (min)</label>
                                <input type="text" id="meal-prep"/>
                            </div>
                            <label htmlFor="meal-ingred-1">Main Ingredients</label>
                            <div className="add-ingred">
                                <label><input type="text" className="meal-ingreds" id="meal-ingred-1"/></label>
                                <label><input type="text" className="meal-ingreds" id="meal-ingred-2"/></label>
                                <label><input type="text" className="meal-ingreds" id="meal-ingred-3"/></label>
                                <label><input type="text" className="meal-ingreds" id="meal-ingred-4"/></label>
                                <label><input type="text" className="meal-ingreds" id="meal-ingred-5"/></label>
                            </div>
                            <div id="invalid-time"></div>
                        </form>

                        <div className="actions">
                            <button className="add" onClick={() => this.add()}>Add Meal</button>
                            <button className="cancel"><a href="/">Cancel</a></button>
                        </div>
                    </div>
                    : <h1>You must be logged in to add a meal</h1>
                }
            </div>
        )
    }
}; 

export default AddMeal; 