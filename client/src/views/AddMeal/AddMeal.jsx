import React, {Component} from 'react'; 
import API from '../../utils/API';

import './style.css'; 

class AddMeal extends Component {

    state = {
        userID: '',
    }

    componentDidMount() {
        this.checkStorage()
        const { allMeals } = this.props.location.state
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
                    ingred6: document.getElementById('meal-ingred-6').value, 
                    ingred7: document.getElementById('meal-ingred-7').value, 
                    ingred8: document.getElementById('meal-ingred-8').value
                }
    
                API.postNewMeal(this.state.userID, newMeal)
                    .then(res => {
                        // console.log('resdata: ', res.data)
                        if(!res.data) {
                            document.getElementById('invalid-time').innerHTML= ''; 
                            document.getElementById('success').innerHTML = ''; 
                            document.getElementById('fail').innerHTML = 'It looks like that meal by that name was already added'; 
                        } else {
                            document.querySelector('form').reset();
                            document.getElementById('invalid-time').innerHTML= '';
                            document.getElementById('fail').innerHTML = ''; 
                            document.getElementById('success').innerHTML = 'Great! You\'ve just added a new meal!'; 
                        }
                    })
                    .catch(err => console.log(err))
    
                console.log(newMeal); 
            }
        } else {
            document.getElementById('invalid-time').innerHTML = 'Please enter both a name and prep time for your meal'; 
        }

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
                                <label><input type="text" className="meal-ingreds" id="meal-ingred-6"/></label>
                                <label><input type="text" className="meal-ingreds" id="meal-ingred-7"/></label>
                                <label><input type="text" className="meal-ingreds" id="meal-ingred-8"/></label>
                            </div>
                            <div id="invalid-time"></div>
                            <div id="success"></div>
                            <div id="fail"></div>
                        </form>

                        <div className="actions">
                            <button className="add" onClick={() => this.add()}>Add Meal</button>
                            <button className="cancel"><a href="/">Go Back</a></button>
                        </div>
                    </div>


                    : <h1>You must be logged in to add a meal</h1>
                }
            </div>
        )
    }
}; 

export default AddMeal; 