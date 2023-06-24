import Api from "./providers";
import { AxiosResponse } from "axios";
import Cookies from 'js-cookie';

export interface RegisterDTO {
    email: string
    password: string
    firstName: string
    lastName: string
}

export interface ResponseRegisterDTO {
    user: User
    message: string
}

export interface User {
    id: number
    email: string
    firstName: string
    lastName: string
    profilePictureUrl: any
    profilePicturePath: any
    isAdmin: boolean
    isActive: boolean
    isEmailConfirmed: boolean
}

export const postRegister = async ({
    email,
    password,
    firstName,
    lastName
}: RegisterDTO): Promise<AxiosResponse<ResponseRegisterDTO>> => {
    const response = await Api.post(`/auth/signup`, { email, password, firstName, lastName })
    return response;
}

export const confirmEmail = async (confirmEmailToken: string): Promise<AxiosResponse> => {
    const response = await Api.post(`/auth/confirm_email/${confirmEmailToken}`)
    return response;
}