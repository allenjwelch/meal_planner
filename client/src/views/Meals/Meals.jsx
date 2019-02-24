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
        let meals = this.shuffleMeals(this.state.allMeals).slice(0, 7); 
        this.setState({mealPlan: meals}, () => {console.log(this.state.mealPlan, "state.mealPlan")})
    }


    render() {
        return (
            <section className="main">
                {
                    this.state.allMeals.length ?

                        this.shuffleMeals(this.state.allMeals).map(meal => {
                            return <li key={meal.id}>{meal.name}</li>
                        })

                    : <img src={logo} className="logo blank-page" alt="logo" />
                }
            </section>
        )
    }
};

export default Meals;
