import React, {Component} from "react";
import API from '../../utils/API';
import logo from '../../logo.png';
import closeIcon from '../../close.png';
import { Link } from "react-router-dom";

import './style.css';

let swap = [];
class Meals extends Component {

    state = {
        allMeals : [], 
        mealPlan: [], //max 7
        welcomeMessage: ['Hope your hungry!', 'Let\'s get cookin!', 'This week\'s meals look great!'],
        updateMeals: this.props.updateMeals,
    }

    componentDidMount() {
        this.getAllMeals()
    }

    getAllMeals() { // get all meals for the user with the user id from props
        API.getAllMeals(this.props.user[0].id)
            .then(res => 
                this.setState({allMeals: res.data, }, () => {
                    // console.log(this.state.allMeals, "state.allMeals"); 
                    this.getMealPlan()
                }))
            .catch(err => console.log(err))
    }

    shuffleMeals(array) {
        return array.sort(() => Math.random() - 0.5); 
    } 

    getMealPlan() {
        // console.log('Update: ', this.props.updateMeals); 
        // console.log(this.props.user[0].meals_list); 
        // console.log(this.props.user[0].meals_list.length); 
        if(this.props.updateMeals || !this.props.user[0].meals_list || this.props.user[0].meals_list.length < 13) { // if checkDate determined a new meal plan is needed, create a new meal plan
            console.log('updating meals...');
            // console.log(this.state.allMeals)
            let meals = this.shuffleMeals(this.state.allMeals).slice(0, 7); 
            this.setState({mealPlan: meals}, () => {
                // console.log(this.state.mealPlan, "state.mealPlan")
            })
        } else { // if no new meal plan is needed, display the user's current meal plan
            let activeMealPlan = this.props.user[0].meals_list.split(","); 
            let currentMeals = [];
            activeMealPlan.forEach(mealId => {
                let meal = this.state.allMeals.filter(meal => {
                    return meal.id === parseInt(mealId);
                }); 
                currentMeals.push(...meal);
            })
            this.setState({mealPlan: currentMeals}, () => {
                // console.log(this.state.mealPlan, "state.mealPlan")
            })
        }
    }

    reorderMealPlan(pos1, pos2) {
        let newMealPlan = this.state.mealPlan; 
        let temp = newMealPlan[pos2]; 
        newMealPlan[pos2] = newMealPlan[pos1]; 
        newMealPlan[pos1] = temp; 
        // console.log(newMealPlan);
        this.setState({mealPlan: newMealPlan}, () => {
            // console.log(this.state.mealPlan, "state.mealPlan")
        })
    }

    selectSwap(e) {
        // console.log(e.target); 
        let day; 
        if(!e.target.dataset.day) {
            day = e.target.parentElement.dataset.day; 
            e.target.parentElement.classList.add('selected');
            // console.log(day); 
        } else {
            day = e.target.dataset.day; 
            e.target.classList.add('selected');
            // console.log(day); 
        }
        if (swap.length < 2) {swap.push(day)}
        if (swap.length === 2) {
            // console.log('ready')
            // console.log(swap[0], swap[1]);
            this.reorderMealPlan(swap[0], swap[1])
            swap = []; 
            this.disableEdits()
        }
    }

    enableSwap() {
        // console.log('editing...');
        let meals = document.querySelectorAll('.display li'); 
        // let swap = [];  
        meals.forEach(node => {
            node.classList.add('editing'); 
            node.style.pointerEvents = "auto";
        })
        // console.log(meals); 
    }

    disableEdits() {
        // console.log('disable!'); 
        let meals = document.querySelectorAll('.display li'); 
        meals.forEach(node => {
            node.classList.remove('editing'); 
            node.classList.remove('selected'); 
            node.style.pointerEvents = "none";
        })
    }

    shufflePlan() {
        // console.log('shuffling...'); 
        let freshShuffle = this.shuffleMeals(this.state.mealPlan); 
        this.setState({mealPlan: freshShuffle}, () => {
            // console.log(this.state.mealPlan, "state.mealPlan")
        })
    }

    viewList() {
        // console.log(this.state.mealPlan);
        let shoppingList = document.createElement('div');
        let modal = document.getElementById('list-modal'); 
        let close = document.createElement('img');
            // close.innerHTML = 'X'; 
            close.setAttribute('id', 'close-modal'); 
            close.setAttribute('src', closeIcon);
            close.addEventListener('click', this.closeModal); 
            // console.log(close); 
            // src={logo} alt="logo"

        this.state.mealPlan.forEach((meal, i) => {
            let recipe = document.createElement('div'); 
                recipe.classList.add('meal');
            let mealName = document.createElement('ul');
                mealName.innerHTML = meal.meal; 
            let ingred1, ingred2, ingred3, ingred4, ingred5, ingred6, ingred7, ingred8; 

            recipe.appendChild(mealName);  

            if (meal.ingred1.length > 0) {
                ingred1 = document.createElement('li'); 
                ingred1.innerHTML = meal.ingred1;
                recipe.appendChild(ingred1);  
            }

            if (meal.ingred2.length > 0) {
                ingred2 = document.createElement('li'); 
                ingred2.innerHTML = meal.ingred2;
                recipe.appendChild(ingred2);  
            }

            if (meal.ingred3.length > 0) {
                ingred3 = document.createElement('li');
                ingred3.innerHTML = meal.ingred3;
                recipe.appendChild(ingred3);  
            }

            if (meal.ingred4.length > 0) {
                ingred4 = document.createElement('li'); 
                ingred4.innerHTML = meal.ingred4;
                recipe.appendChild(ingred4);  
            }

            if (meal.ingred5.length > 0) {
                ingred5 = document.createElement('li')
                ingred5.innerHTML = meal.ingred5;
                recipe.appendChild(ingred5);  
            }  
            
            if (meal.ingred6.length > 0) {
                ingred6 = document.createElement('li')
                ingred6.innerHTML = meal.ingred6;
                recipe.appendChild(ingred6);  
            } 

            if (meal.ingred7.length > 0) {
                ingred7 = document.createElement('li')
                ingred7.innerHTML = meal.ingred7;
                recipe.appendChild(ingred7);  
            } 

            if (meal.ingred8.length > 0) {
                ingred8 = document.createElement('li')
                ingred8.innerHTML = meal.ingred8;
                recipe.appendChild(ingred8);  
            } 
            shoppingList.appendChild(recipe); 
        })
        
        // console.log(shoppingList); 
        modal.appendChild(close);
        modal.appendChild(shoppingList);
        modal.classList.add('active'); 
    }

    closeModal() {
        // console.log('closing...');
        let modal = document.getElementById('list-modal');
        modal.classList.remove('active'); 
        while(modal.firstChild){
            modal.removeChild(modal.firstChild);
        }
    }

    signOut() {
        let currentMealPlan = []; 
        this.state.mealPlan.forEach(meal => {
            currentMealPlan.push(meal.id); 
        })
        API.updateMealPlan(this.props.user[0].id, currentMealPlan)
        .then(res => {
            // console.log(res.data)
            this.setState({user: false }, () => {
                localStorage.removeItem('user'); 
                window.location = '/'; 
            });
        })   
    }

    render() {
        return (
            <section className="main">
                {
                    this.state.allMeals.length ?
                    
                        <div className="meal-plan">
                            <img src={logo} alt="logo" />
                            <h1 className='title'>Welcome {this.props.user[0].user}!</h1>
                            <p className='loaded'>Loaded {this.state.mealPlan.length} out of {this.state.allMeals.length} total meals</p>
                            <p className='welcome'>"{this.state.welcomeMessage[Math.floor(Math.random() * 3)]}" </p>
                            <ul className="display">
                                {
                                    this.state.mealPlan.map( (meal, index) => {
                                        return <li key={meal.id} data-day={index} onClick={this.selectSwap.bind(this)}><span>{meal.meal}</span></li>
                                    })
                                }
                            </ul>

                            <div className="actions">
                                <button className="swap" onClick={() => this.enableSwap()}>Swap</button>
                                <button className="shuffle" onClick={() => this.shufflePlan()}>Shuffle</button>
                                <button className="createNew">
                                    <Link to="/add">Add Meal</Link>
                                </button>                                
                            </div>

                            <div className="actions special-actions">
                                <div id="list-modal"></div>
                                <button className="shopping-list-trigger" onClick={() => this.viewList()}>Shopping List</button>
                            </div>

                            <button className="signout-btn" onClick={() => this.signOut()}>Sign Out & Save</button>

                        </div>


                    : <div className="no-meals">
                        <img src={logo} className="logo blank-page" alt="logo" />
                        <h1>No Meals</h1>
                        <button className="createNew">
                            <Link to="/add">Add Meal</Link>
                        </button>
                        <button className="signout-btn" onClick={() => this.signOut()}>Sign Out</button>

                    </div>
                }
            </section>
        )
    }
};

export default Meals;
