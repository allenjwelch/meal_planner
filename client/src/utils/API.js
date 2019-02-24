import axios from 'axios';


export default {

    getAllMeals: function() {
        return axios.get('/nomnom/meals');
    }

};