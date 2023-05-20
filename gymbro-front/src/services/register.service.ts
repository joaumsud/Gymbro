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
    id: number
    email: string
    firstName: string
    lastName: string
    profilePictureUrl: string | null
    profilePicturePath: string | null
    isAdmin: boolean
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
