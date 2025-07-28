import axios from 'axios'

const isDevelopment = import.meta.env.MODE === 'development'
const myBaseUrl = isDevelopment ? import.meta.env.VITE_API_BASE_URL_LOCAL : import.meta.env.VITE_API_BASE_URL_DEPLOY
const api = axios.create({
    baseURL: myBaseUrl,  
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
        if(error.response?.status === 401 && error.config.method !== 'get'){
            localStorage.removeItem('access_token')
            localStorage.removeItem('refresh_token')
            window.location.reload()
        }
        return Promise.reject(error)
    }
)

export const AddSkill = {
   Skill: (formData) => api.post('/skill/', formData),
   List_Skill: (search = '') => api.get(`/list_skill/?search=${search}`),
   allSkill: () => api.get('/list_skill/'),
   Update_skill: (SkillID, formData) => api.put(`/skills/${SkillID}/update/`, formData)
}

export default api