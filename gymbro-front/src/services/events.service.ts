import { AxiosResponse } from "axios";
import { CreateEventDTO, EventByIdDTO, Events } from "../models/Events";
import Api from "./providers";

export const getEvents = async () => {
    const response = await Api.get(`/events/public_events`)
    return response
}

export const postEvents = async ({
    title,
    description,
    eventDate,
    isPublic,
    hasLimit,
    limitCount,
    geocode,
}: CreateEventDTO): Promise<AxiosResponse<Events>> => {
    const response = await Api.post(`/events/`, {
        title,
        description,
        eventDate,
        isPublic,
        hasLimit,
        limitCount,
        geocode,
    })
    return response
}

export const getEventsById = async (id: number): Promise<AxiosResponse<EventByIdDTO>> => {
    const response = await Api.get(`/events/${id}`)
    return response
}