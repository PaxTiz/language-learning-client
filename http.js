import axios from 'axios'

const http = axios.create({
    baseURL: 'http://localhost:8080'
})

http.interceptors.response.use(response => {
    if (process.server && process.env.NODE_ENV !== 'production' && response) {
        /* eslint-disable no-console */
        console.log(response.status, response.config.url)
    }
    return response.data
})


export default http
