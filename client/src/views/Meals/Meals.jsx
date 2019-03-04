import React, {Component} from "react";
import API from '../../utils/API';
import logo from '../../logo.png';

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
        e.target.classList.add('selected');
        if (swap.length < 2) {swap.push(e.target.dataset.day)}
        if (swap.length === 2) {
            console.log('ready')
            console.log(swap[0], swap[1]);
            this.reorderMealPlan(swap[0], swap[1])
            swap = []; 
            this.disableEdits()
        }
    }

    enableEdits() {
        console.log('editing...');
        let meals = document.querySelectorAll('.display li'); 
        // let swap = [];  
        meals.forEach(node => {
            node.classList.add('editing'); 
            node.style.pointerEvents = "auto";
            // node.addEventListener('click', selectSwap)               
            // node.addEventListener('click', (e) => {
            //     if (swap.length < 2) {swap.push(e.target.dataset.day)}
            //     if (swap.length == 2) {
            //         console.log('ready')
            //         console.log(swap[0], swap[1]);
            //         if (swap[0] == swap[1]) {
            //             console.log('delete and fetch new meal')
            //         } else {
            //             this.reorderMealPlan(swap[0], swap[1])
            //             swap = []; 
            //             console.log(swap); 
            //             this.disableEdits(); 
            //         }
            //     }
            // })

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
        // document.querySelector('display').removeChild('li'); 
        this.setState({mealPlan: freshShuffle}, () => {console.log(this.state.mealPlan, "state.mealPlan")})
    }

    emailList() {
        console.log(this.state.mealPlan);

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
                                        return <li key={meal.id} data-day={index} onClick={this.selectSwap.bind(this)}>{meal.meal}</li>
                                    })
                                }
                            </ul>

                            <div className="actions">
                                <button className="edit" onClick={() => this.enableEdits()}>Edit</button>
                                <button className="shuffle" onClick={() => this.shufflePlan()}>Shuffle</button>
                                <button className="createNew"><a href="/add-meal">Add Meal</a></button>
                            </div>

                            <div className="actions special-actions">
                                <button className="email" onClick={() => this.emailList()}>Email</button>
                            </div>
                        </div>


                    : <div className="no-meals">
                        <img src={logo} className="logo blank-page" alt="logo" />
                        <h1>No Meals</h1>
                        <button className="createNew"><a href="/add-meal">Add Meal</a></button>
                    </div>
                }
            </section>
        )
    }
};

export default Meals;
