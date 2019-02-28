import axios from 'axios';


export default {

    getUserByName: function() {
        return axios.get('/nomnom/user')
    },
    getUserById: function(uid) {
        return axios.get(`/nomnom/user/${uid}`)
    },
    getAllMeals: function(uid) {
        console.log(uid)
        return axios.get(`/nomnom/meals/${uid}`);
    }

};