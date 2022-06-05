import axios from 'axios'

const http = axios.create({
    baseURL: 'http://localhost:8080'
})

axios.interceptors.response.use((response) => {
    return response.data
})

export default http
