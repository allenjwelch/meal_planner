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

    // constructor(props){
    //     super(props)
    //  }

    componentDidMount() {
        this.getAllMeals()
    }

    getAllMeals() { // get all meals for the user with the user id from props
        console.log(this.props.user)
        API.getAllMeals(this.props.user[0].id)
            .then(res => 
                this.setState({allMeals: res.data, }, () => {
                    console.log(this.state.allMeals, "state.allMeals"); 
                    this.getMealPlan()
                }))
            .catch(err => console.log(err))
    }

    shuffleMeals(array) {
        return array.sort(() => Math.random() - 0.5); 
    } 

    getMealPlan() {
        if(this.state.updateMeals || !this.props.user[0].meals_list) { // if checkDate determined a new meal plan is needed, create a new meal plan
            let meals = this.shuffleMeals(this.state.allMeals).slice(0, 7); 
            this.setState({mealPlan: meals}, () => {console.log(this.state.mealPlan, "state.mealPlan")})
        } else { // if no new meal plan is needed, display the user's current meal plan
            let activeMealPlan = this.props.user[0].meals_list.split(","); 
            console.log(activeMealPlan); 
            let currentMeals = [];
            activeMealPlan.forEach(mealId => {
                console.log(mealId); 
                let meal = this.state.allMeals.filter(meal => {
                    return meal.id === parseInt(mealId);
                }); 
                currentMeals.push(...meal);
            })
            this.setState({mealPlan: currentMeals}, () => {console.log(this.state.mealPlan, "state.mealPlan")})
        }
    }

    reorderMealPlan(pos1, pos2) {
        let newMealPlan = this.state.mealPlan; 
        let temp = newMealPlan[pos2]; 
        newMealPlan[pos2] = newMealPlan[pos1]; 
        newMealPlan[pos1] = temp; 
        console.log(newMealPlan);
        this.setState({mealPlan: newMealPlan}, () => {console.log(this.state.mealPlan, "state.mealPlan")})
    }

    selectSwap(e) {
        console.log('clicked'); 
        console.log(e.target); 
        let day; 
        if(!e.target.dataset.day) {
            day = e.target.parentElement.dataset.day; 
            e.target.parentElement.classList.add('selected');
            console.log(day); 
        } else {
            day = e.target.dataset.day; 
            e.target.classList.add('selected');
            console.log(day); 

        }
        if (swap.length < 2) {swap.push(day)}
        if (swap.length === 2) {
            console.log('ready')
            console.log(swap[0], swap[1]);
            this.reorderMealPlan(swap[0], swap[1])
            swap = []; 
            this.disableEdits()
        }
    }

    enableSwap() {
        console.log('editing...');
        let meals = document.querySelectorAll('.display li'); 
        // let swap = [];  
        meals.forEach(node => {
            node.classList.add('editing'); 
            node.style.pointerEvents = "auto";
        })
        console.log(meals); 
    }

    disableEdits() {
        console.log('disable!'); 
        let meals = document.querySelectorAll('.display li'); 
        meals.forEach(node => {
            node.classList.remove('editing'); 
            node.classList.remove('selected'); 
            node.style.pointerEvents = "none";
        })
    }

    shufflePlan() {
        console.log('shuffling...'); 
        let freshShuffle = this.shuffleMeals(this.state.mealPlan); 
        this.setState({mealPlan: freshShuffle}, () => {console.log(this.state.mealPlan, "state.mealPlan")})
    }

    viewList() {
        console.log(this.state.mealPlan);
        let shoppingList = document.createElement('div');
        let modal = document.getElementById('list-modal'); 
        let close = document.createElement('img');
            // close.innerHTML = 'X'; 
            close.setAttribute('id', 'close-modal'); 
            close.setAttribute('src', closeIcon);
            close.addEventListener('click', this.closeModal); 
            console.log(close); 
            // src={logo} alt="logo"

        this.state.mealPlan.forEach(meal => {
            let recipe = document.createElement('div'); 
                recipe.classList.add('meal');
            let mealName = document.createElement('ul');
                mealName.innerHTML = meal.meal; 
            let ingred1 = document.createElement('li'); 
                ingred1.innerHTML = meal.ingred1;
                // ingred1.innerHTML = 'testing';
            let ingred2 = document.createElement('li'); 
                ingred2.innerHTML = meal.ingred2;
                // ingred2.innerHTML = 'testing again';
            let ingred3 = document.createElement('li');
                ingred3.innerHTML = meal.ingred3;
            let ingred4 = document.createElement('li'); 
                ingred4.innerHTML = meal.ingred4;
            let ingred5 = document.createElement('li')
                ingred5.innerHTML = meal.ingred5;

            recipe.appendChild(mealName);  
            recipe.appendChild(ingred1);  
            recipe.appendChild(ingred2);  
            recipe.appendChild(ingred3);  
            recipe.appendChild(ingred4);  
            recipe.appendChild(ingred5);  
            shoppingList.appendChild(recipe); 
        })
        
        console.log(shoppingList); 
        modal.appendChild(close);
        modal.appendChild(shoppingList);
        modal.classList.add('active'); 


    }

    closeModal() {
        console.log('closing...');
        let modal = document.getElementById('list-modal');
        modal.classList.remove('active'); 
        while(modal.firstChild){
            modal.removeChild(modal.firstChild);
        }
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
                                <button className="createNew">
                                    <Link to="/add">Add Meal</Link>
                                </button>                                
                                <button className="shuffle" onClick={() => this.shufflePlan()}>Shuffle</button>
                            </div>

                            <div className="actions special-actions">
                                <div id="list-modal"></div>
                                <button className="shopping-list-trigger" onClick={() => this.viewList()}>Shopping List</button>
                            </div>
                        </div>


                    : <div className="no-meals">
                        <img src={logo} className="logo blank-page" alt="logo" />
                        <h1>No Meals</h1>
                        <button className="createNew">
                            <Link to="/add">Add Meal</Link>
                        </button>
                    </div>
                }
            </section>
        )
    }
};

export default Meals;
