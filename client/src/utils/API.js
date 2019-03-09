import axios from 'axios';


export default {

    getUserByName: function(user, pass) { // just for testing..
        return axios.get(`/nomnom/user/${user}/${pass}`)
    },
    getUserById: function(uid) {
        return axios.get(`/nomnom/user/${uid}`)
    },
    postNewUser: function(user, pass, currentDate) {
        return axios.post(`/nomnom/user/register`, {user, pass, currentDate})
    },
    updateLoginDate: function(uid, currentDate) {
        return axios.put(`/nomnom/user/${uid}`, {currentDate}); 
    },
    updateMealPlan: function(uid, currentMealPlan) {
        return axios.put(`/nomnom/user/meals/${uid}`, {currentMealPlan}); 
    },
    getAllMeals: function(uid) {
        console.log(uid)
        return axios.get(`/nomnom/meals/${uid}`);
    },
    postNewMeal: function(uid, newMeal) {
        return axios.post(`/nomnom/meals/new`, {uid, newMeal})
    },
};