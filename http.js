import axios from 'axios'

const $api = axios.create({
    baseURL:
        process.env.NEXT_PUBLIC_API_BASE_URL ||
        'https://jedel-jardem-production.up.railway.app/api',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
})

$api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('access')
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

$api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            if (error.response.status === 401) {
                console.error('Unauthorized! Redirecting to login...')
                window.location.href = '/login'
            } else if (error.response.status === 403) {
                console.error("Forbidden! You don't have access.")
            } else if (error.response.status === 500) {
                console.error('Server error! Please try again later.')
            }
        }
        return Promise.reject(error)
    }
)

export default $api
