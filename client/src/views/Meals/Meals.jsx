import React, {Component} from "react";
import API from '../../utils/API';
import logo from '../../logo.png';

import './style.css';

class Meals extends Component {

    state = {
        allMeals : [], 
        mealPlan: [] //max 7
    }

    componentDidMount() {
        this.getAllMeals()
    }

    // componentDidUpdate() {
    //     this.getMealPlan()
    // }

    getAllMeals() {
        API.getAllMeals()
            .then(res => 
                this.setState({allMeals: res.data, }, () => {
                    console.log(this.state.allMeals, "state.allMeals"); 
                    this.getMealPlan()
                }))
            .then(this.getMealPlan())
            .catch(err => console.log(err))
    }

    shuffleMeals(array) {
        // console.log(array.sort(() => Math.random() - 0.5))
        return array.sort(() => Math.random() - 0.5); 
    } 

    getMealPlan() {
        //! TODO: if local storage has meal plan && if new week
        let meals = this.shuffleMeals(this.state.allMeals).slice(0, 7); 
        this.setState({mealPlan: meals}, () => {console.log(this.state.mealPlan, "state.mealPlan")})
    }

    reorderMealPlan(pos1, pos2) {
        let newMealPlan = this.state.mealPlan; 
        let temp = newMealPlan[pos2]; 
        newMealPlan[pos2] = newMealPlan[pos1]; 
        newMealPlan[pos1] = temp; 
        console.log(newMealPlan);
    }

    enableEdits() {
        console.log('editing...');
        let meals = document.querySelectorAll('.display li'); 
        meals.forEach(node => {
            node.classList.add('editing'); 
            node.addEventListener('click', (e) => {
                console.log(e.target); 
            })
            console.log(node); 
        })
        console.log(meals); 
    }


    render() {
        return (
            <section className="main">
                {
                    this.state.allMeals.length ?
                    
                        <div className="meal-plan">
                            <img src={logo} alt="logo" />
                            <h1>Welcome User!</h1>
                            {/* <ul className='days'>
                                <li>Sun</li>
                                <li>sat</li>
                            
                            </ul> */}
                            <ul className="display">
                                {
                                    this.state.mealPlan.map( (meal, index) => {
                                        return <li key={meal.id} data-day={index}>{meal.name}</li>
                                    })
                                }
                            </ul>


                            <div className="actions">
                                <button className="edit" onClick={() => this.enableEdits()}>Edit</button>
                            </div>
                        </div>


                    : <img src={logo} className="logo blank-page" alt="logo" />
                }
            </section>
        )
    }
};

export default Meals;
