import axios from 'axios'

const clienteAxios = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
    },
    withCredentials: true
    // Se debe activar en laravel config.cors 'support_credentials' => true
})

export default clienteAxios