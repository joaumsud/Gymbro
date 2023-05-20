import './style.css'
import "leaflet/dist/leaflet.css";
import { Divider, Grid, TextField, Typography } from "@mui/material";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from 'leaflet';
import { Events } from '../../models/Events';
import { useCallback, useEffect, useState } from 'react';
import { getEvents } from '../../services/events.service';
import PopUpEvents from '../PopUpEvents';
import { useBackdrop } from '../../hooks/backdrop';
import { useFeedback } from '../../hooks/addFeedback';

const MapEvents = () => {
    const [markers, setMarkers] = useState<Events[]>([])
    const { handleBackdrop } = useBackdrop()
    const { addFedback } = useFeedback()

    const eventsList = useCallback(() => {
        handleBackdrop(true)
        getEvents()
            .then(res => {
                setMarkers(res.data)
                handleBackdrop(false)
            })
            .catch(err => {
                console.log(err)
                handleBackdrop(false)
            })
    }, [])

    useEffect(() => {
        eventsList()
    }, [])


    const customIcon = new Icon({
        iconUrl: 'https:// cdn-icons-png.flaticon.com/512/5591/5591266.png',
        iconSize: [38, 38]
    })

    return (
        <>
            <MapContainer center={[-22.812028708655735, -45.19140005961926]} zoom={13}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {
                    markers!.map(marker => (
                        <Marker position={marker.geocode} key={marker.id}  >
                            <Popup>
                                <PopUpEvents title={marker.title} date={marker.eventDate} id={marker.id} />
                            </Popup>
                        </Marker>
                    ))
                }
            </MapContainer>
        </>
    );
}

export default MapEvents;
