import axios from 'axios';

export default axios.create({
    baseURL: 'https://api.rawg.io/api/',
    params: {
        key: '6eee6fb73bf44ad4be8ec6683e758fb2'
    }
});