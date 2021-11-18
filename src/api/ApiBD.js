import axios from 'axios';


const ApiBD=axios.create({
    baseURL:'http://localhost:4000/'
})


export default ApiBD;