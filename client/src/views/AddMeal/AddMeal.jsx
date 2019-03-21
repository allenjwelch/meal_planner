import React, {Component} from 'react'; 
import API from '../../utils/API';
import Meal from '../../components/Meal'; 

import './style.css'; 

class AddMeal extends Component {
    constructor(props) {
        super(props); 
        this.edit = this.edit.bind(this);

    }

    state = {
        userID: '',
        allMeals: [],
        isEditing: false,
    }

    componentDidMount() {
        this.checkStorage()
        
        // const { allMeals } = this.props.location.state
        // console.log(this.props.location); 
    }

    getAllMeals() { // get all meals for the user with the user id from props
        API.getAllMeals(this.state.userID)
            .then(res => 
                this.setState({allMeals: res.data, }, () => {
                    console.log(this.state.allMeals, "state.allMeals"); 
                    // this.getMealPlan()
                }))
            .catch(err => console.log(err))
    }

    checkStorage() {
        if(localStorage.getItem('user')) {
            let user = localStorage.getItem('user'); 
            console.log('user:', user); 
            this.setState({ userID : user }, () => {
                console.log(this.state.userID, "state.userID")
                this.getAllMeals()
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
                    .then(this.getAllMeals())
                    .then(document.querySelector('.add-title').scrollIntoView({behavior: "smooth"}))
                    .catch(err => console.log(err))
    
                console.log(newMeal); 
            }
        } else {
            document.getElementById('invalid-time').innerHTML = 'Please enter both a name and prep time for your meal'; 
        }

    }

    edit(e) {
        console.log('editing...')
        this.setState({ isEditing: true })
        let mealID = e.target.parentNode.dataset.mealId;
        console.log(mealID); 

        let mealEdit = this.state.allMeals.filter(meal => meal.id === parseInt(mealID)); 
        console.log(mealEdit); 
        document.getElementById('meal-name').value = mealEdit[0].meal; 
        document.getElementById('meal-name').dataset.mealId = mealEdit[0].id; 
        document.getElementById('meal-prep').value = mealEdit[0].prep_time;
        document.getElementById('meal-ingred-1').value = mealEdit[0].ingred1;
        document.getElementById('meal-ingred-2').value = mealEdit[0].ingred2;
        document.getElementById('meal-ingred-3').value = mealEdit[0].ingred3;
        document.getElementById('meal-ingred-4').value = mealEdit[0].ingred4;
        document.getElementById('meal-ingred-5').value = mealEdit[0].ingred5;
        document.getElementById('meal-ingred-6').value = mealEdit[0].ingred6;
        document.getElementById('meal-ingred-7').value = mealEdit[0].ingred7;
        document.getElementById('meal-ingred-8').value = mealEdit[0].ingred8;
        document.querySelector('.add-title').scrollIntoView({behavior: "smooth"})
    }

    update() {
        console.log('updating...'); 
        if(document.getElementById('meal-name').value && document.getElementById('meal-prep').value) {
            console.log('has name')
            if(isNaN(document.getElementById('meal-prep').value)) {
                console.log('NOT a number')
                document.getElementById('invalid-time').innerHTML = 'Please enter a valid number for Prep Time in minutes'; 
            } else {
                console.log('number');
                
                let updatedMeal = {
                    id: document.getElementById('meal-name').dataset.mealId,
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
    
                API.updateMeal(this.state.userID, updatedMeal)
                    .then(res => {
                        // console.log('resdata: ', res.data)
                        if(!res.data) {
                            document.getElementById('invalid-time').innerHTML= ''; 
                            document.getElementById('success').innerHTML = ''; 
                            document.getElementById('fail').innerHTML = 'Sorry, it looks like something went wrong..'; 
                        } else {
                            document.querySelector('form').reset();
                            document.getElementById('invalid-time').innerHTML= '';
                            document.getElementById('fail').innerHTML = ''; 
                            document.getElementById('success').innerHTML = 'Great! You\'ve just updated your meal!'; 
                        }
                    })
                    .then(this.setState({isEditing: false}, () => {
                        this.getAllMeals()
                        document.querySelector('.add-title').scrollIntoView({behavior: "smooth"})
                    }))
                    .catch(err => console.log(err))
    
                console.log(updatedMeal); 
            }
        } else {
            document.getElementById('invalid-time').innerHTML = 'Please enter both a name and prep time for your meal'; 
        }
    }

    delete() {
        console.log('deleting...'); 
        let meal_id = document.getElementById('meal-name').dataset.mealId;
        console.log(meal_id); 
        API.deleteMeal(this.state.userID, meal_id) 
            .then(res => {
                console.log(res)
                document.getElementById('success').innerHTML = 'Yeah that meal sucked anyway...'; 
            })
            .then(this.setState({isEditing: false}, () => {
                this.getAllMeals()
                document.querySelector('form').reset()
                document.querySelector('.add-title').scrollIntoView({behavior: "smooth"})
            }))
            .catch(err => console.log(err))
    }


    render() {
        return (
            <div className="main">

                {
                    this.state.userID ?

                    <div className="add-meal-container">
                    {
                        this.state.isEditing ? 
                            <h1 className="add-title">Update a Meal</h1>
                        :   <h1 className="add-title">Add a Meal</h1>
                    }
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

                            {
                                this.state.isEditing ? 
                                <div className="actions">
                                    <button className="update" onClick={() => this.update()}>Update Meal</button>
                                    <button className="delete" onClick={() => this.delete()}>Delete Meal</button>
                                </div>

                                : <div className="actions">
                                    <button className="add" onClick={() => this.add()}>Add Meal</button>
                                    <button className="cancel"><a href="/">Go Back</a></button>
                                </div>

                            }

                        <h3>Current Meals</h3>
                        <div className="user-meals">
                            {
                                this.state.allMeals.sort( (a, b) => a.meal > b.meal ? 1 : -1)
                                    .map( (meal, index) => {
                                    return <Meal
                                        key={index}
                                        id={meal.id}
                                        meal={meal.meal} 
                                        ingred1={meal.ingred1}
                                        ingred2={meal.ingred2}
                                        ingred3={meal.ingred3}
                                        ingred4={meal.ingred4}
                                        ingred5={meal.ingred5}
                                        ingred6={meal.ingred6}
                                        ingred7={meal.ingred7}
                                        ingred8={meal.ingred8}
                                        prep_time={meal.prep_time}
                                        edit={this.edit}
                                        // onClick={this.edit()}
                                         />
                                })

                            }

                        
                        </div>

                    </div>


                    : <h1>You must be logged in to add a meal</h1>
                }
            </div>
        )
    }
}; 

export default AddMeal; 