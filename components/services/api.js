import axios from 'axios'

const API_URL = 'http://localhost:8000/api'
const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    }
})

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('access_token')
    if(token){
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if(error.response?.status === 401){
            localStorage.removeItem('access_token')
            localStorage.removeItem('refresh_token')
            window.location.reload()
        }
        return Promise.reject(error)
    }
)

export const AuthAPI = {
   register: (formData) => api.post('/register/', formData),
    login: (credentials) => api.post('/login/', credentials),
}

export const CourseAPI = {
    
}


export default api