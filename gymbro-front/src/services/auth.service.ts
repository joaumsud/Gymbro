import Api from "./providers";
import { InputsLoginDTO } from '../models/Login/index'
import { AxiosResponse } from "axios";
import Cookies from 'js-cookie';

export interface PostAuthStateDTO{
    email: string;
    password: string
}

export interface AuthStateDTO {
    token: string;
    refreshToken: string;
}

export const checkToken = async (refreshToken: string) => {
    try {
        const response = await Api.post(``, { getRefreshToken })
        if (response.status === 200) {
            const { token } = response.data;
            Cookies.set('acessToken', token)
            return token;
        }
    } catch (error) {
        console.log(error)
    }
    return null
}

export const loginPost = async ({email, password}: PostAuthStateDTO) => {
    try {
        const response = await Api.post(`/auth/login`, { email, password })
        if (response.status === 200) {
            const { acessToken, refreshToken } = response.data;
            Cookies.set('acessToken', acessToken);
            Cookies.set('refreshToken', refreshToken)
            return { acessToken, refreshToken }
        }
    } catch (error) {
        console.log(error)
    }
}

export const getToken = (): string => Cookies.get('acessToken') || '';

export const getRefreshToken = (): string => Cookies.get('refreshToken') || '';

export const logout = () => {
    Cookies.remove('acessToken');
    Cookies.remove('refreshToken')
}