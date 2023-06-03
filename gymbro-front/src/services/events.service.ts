import { AxiosResponse } from "axios";
import { CreateEventDTO, EventByIdDTO, Events } from "../models/Events";
import Api from "./providers";

export interface EventsDTO {
    events: EventUnique[];
    count: number;
}

export interface EventUnique {
    id: number;
    title: string;
    description: string;
    eventDate: string;
    isPublic: boolean;
    hasLimit: boolean;
    limitCount: number;
    isActive: boolean;
    geocode: [number, number];
    adminId: number;
    isAdmin: boolean;
}


export const getEvents = async (): Promise<AxiosResponse<EventsDTO>> => {
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

export const getEventsByUser = async (): Promise<AxiosResponse<EventsDTO>> => {
    const response = await Api.get(`/events/user_events`)
    return response;
}

export const deleteEvent = async (eventId: number): Promise<AxiosResponse> => {
    const response = await Api.delete(`/events/${eventId}`)
    return response;
}

export const joinEvent = async (eventId: number) => {
    const response = await Api.post(`/events/join_event/${eventId}`)
    return response
}