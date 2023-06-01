import { useCallback, useEffect, useState } from "react";
import { EventsDTO, getEventsByUser } from "../../services/events.service";

const EventsList: React.FC = () => {
    const [userEvents, setUserEvents] = useState<EventsDTO>()

    const getEvents = useCallback(() => {
        getEventsByUser().
            then(res => {
                console.log(res)
                setUserEvents(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])
    useEffect(() => {
        getEvents()
    }, [])
        console.log("Teste",userEvents)
    return (
        <>
        </>
    )
}

export default EventsList;