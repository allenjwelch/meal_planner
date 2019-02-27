import axios from 'axios';


export default {

    getUser: function() {
        return axios.get('/nomnom/user')
    },
    getAllMeals: function(uid) {
        console.log(uid)
        return axios.get(`/nomnom/meals/${uid}`);
    }

};