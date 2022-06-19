const API_URL = process.env.NUXT_ENV_API_URL

export default {
    apiUrl: API_URL,

    endpoints: {
        languages: `${API_URL}/languages`,
        courses: `${API_URL}/courses`,
    }
}