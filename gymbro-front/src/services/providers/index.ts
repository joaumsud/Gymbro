import axios from 'axios'
import Cookies from 'js-cookie';

const Api = axios.create({
    baseURL: "https://gymbro-apy.onrender.com/api/v1"
})

Api.interceptors.request.use((config) => {
    const token = Cookies.get('refreshToken') || '';
    const isAuthenticationRequest = config.url === `/auth/login` || config.url === '/auth/signup' || config.url === `/auth/forgot_password`

    if (!isAuthenticationRequest && token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

export default Api;