import { AxiosResponse } from "axios";
import { Events } from "../models/Events";
import Api from "./providers";

export const getEvents = async () => {
    const response = await Api.get(`/events/public_events`)
    return response
}

export const postEvents = async () => {
    const response = await Api.post(`/events/`)
    return response
}

export const getEventsById = async (id: number): Promise<AxiosResponse<Events>> => {
    const response = await Api.get(`/events/${id}`)
    return response
}