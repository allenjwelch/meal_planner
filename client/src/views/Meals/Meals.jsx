import React, {Component} from "react";
import API from '../../utils/API';
import logo from '../../logo.png';

import './style.css';

let swap = [];
class Meals extends Component {

    state = {
        allMeals : [], 
        mealPlan: [], //max 7
    }

    constructor(props){
        super(props)
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
        this.setState({mealPlan: newMealPlan}, () => {console.log(this.state.mealPlan, "state.mealPlan")})
    }

    selectSwap(e) {
        console.log('clicked'); 
        console.log(e.target); 
        e.target.classList.add('selected');
        if (swap.length < 2) {swap.push(e.target.dataset.day)}
        if (swap.length == 2) {
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
        this.setState({mealPlan: freshShuffle}, () => {console.log(this.state.mealPlan, "state.mealPlan")})
    }


    render() {
        return (
            <section className="main">
                {
                    this.state.allMeals.length ?
                    
                        <div className="meal-plan">
                            <img src={logo} alt="logo" />
                            <h1>Welcome {this.props.user[0].name}</h1>
                            <ul className="display">
                                {
                                    this.state.mealPlan.map( (meal, index) => {
                                        return <li key={meal.id} data-day={index} onClick={this.selectSwap.bind(this)}>{meal.name}</li>
                                    })
                                }
                            </ul>


                            <div className="actions">
                                <button className="edit" onClick={() => this.enableEdits()}>Edit</button>
                                <button className="shuffle" onClick={() => this.shufflePlan()}>Shuffle</button>
                            </div>
                        </div>


                    : <img src={logo} className="logo blank-page" alt="logo" />
                }
            </section>
        )
    }
};

export default Meals;