import axios from "axios"

let BaseApi = axios.create({
    // baseURL: 'https://lucban-e-commerce-api.herokuapp.com/api'
    baseURL: 'http://localhost:8000/api'
});

let Api = function() {
    let token = localStorage.getItem('token')

    if(token) {
        BaseApi.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }

    return BaseApi;
}

export default Api