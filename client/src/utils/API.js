import axios from 'axios';


export default {

    getUser: function() {
        return axios.get('/nomnom/user')
    },
    getAllMeals: function() {
        return axios.get('/nomnom/meals');
    }

};