import axios from 'axios'

const API_URL = 'http://localhost:8000/api'
const api = axios.create({
    baseURL: API_URL,
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

export const AddSkill = {
   Category: (formData) => api.post('/skill/', formData)
}




export default api