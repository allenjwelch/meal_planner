import axios from 'axios';


export default {

    getUserByName: function(user, pass) { // just for testing..
        return axios.get(`/nomnom/user/${user}/${pass}`)
    },
    getUserById: function(uid) {
        return axios.get(`/nomnom/user/${uid}`)
    },
    postNewUser: function(user, pass) {
        return axios.post(`/nomnom/user/register`, {user, pass})
    },
    updateLoginDate: function() {
        //todo
    },
    getAllMeals: function(uid) {
        console.log(uid)
        return axios.get(`/nomnom/meals/${uid}`);
    },
    postNewMeal: function(uid, newMeal) {
        return axios.post(`/nomnom/meals/new-meal`, {uid, newMeal})
    }
};