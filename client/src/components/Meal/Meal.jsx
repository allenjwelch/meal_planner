import React, {Component} from 'react'; 
import editImg from '../../edit.png';

import './style.css'; 

const Meal = (props) => {

    const {id, meal, ingred1, ingred2, ingred3, ingred4, ingred5, ingred6, ingred7, ingred8, prep_time, edit} = props;
    
        return (
            <div className="meal" data-meal-id={id} onClick={(e) => edit(e)}>
                <p>{meal}</p>
                <img src={editImg} alt="edit"/>
                {/* <button onClick={() => edit()}>Edit</button> */}
            </div>
        )
    

}

export default Meal; 