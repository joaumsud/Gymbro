import './style.css'
import "leaflet/dist/leaflet.css";
import { Divider, Grid, TextField, Typography } from "@mui/material";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon, LatLngExpression } from 'leaflet';
import { Events } from '../../models/Events';
import { useCallback, useEffect, useState, useLayoutEffect } from 'react';
import { EventsDTO, getEvents } from '../../services/events.service';
import PopUpEvents from '../PopUpEvents';
import { useBackdrop } from '../../hooks/backdrop';
import { useFeedback } from '../../hooks/addFeedback';

const MapEvents = () => {
    const [markers, setMarkers] = useState<EventsDTO>()
    const { handleBackdrop } = useBackdrop()
    const { addFedback } = useFeedback()

    // const [centerLocation, setCenterLocation] = useState<LatLngExpression>();

    const eventsList = useCallback(() => {
        handleBackdrop(true)
        getEvents()
            .then(res => {
                setMarkers(res.data)
                handleBackdrop(false)
            })
            .catch(err => {
                addFedback({
                    description: 'Erro ao exibir os eventos',
                    typeMessage: 'error'
                })
                handleBackdrop(false)
            })
    }, [])

    useEffect(() => {
        eventsList()
    }, [])

    const deleteEventInPop = () => {
        eventsList()
    }

    // navigator.geolocation.getCurrentPosition(location => {
    //     setCenterLocation([location.coords.latitude, location.coords.longitude])
    // },
    //     error => {
    //         console.log(error);
    //     });

    const customIcon = new Icon({
        iconUrl: 'https:// cdn-icons-png.flaticon.com/512/5591/5591266.png',
        iconSize: [38, 38]
    })
    console.log(markers)
    return (
        <>
            <MapContainer center={[-22.7999744, -45.2001792]} zoom={13}>
                <TileLayer
                    url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {
                    markers?.events && markers.events!.map((marker: any) => (
                        <Marker position={marker.geocode} key={marker.id}  >
                            <Popup>
                                <PopUpEvents title={marker.title} date={marker.eventDate} id={marker.id} deleteEventInPop={deleteEventInPop} />
                            </Popup>
                        </Marker>
                    ))
                }
            </MapContainer>
        </>
    );
}

export default MapEvents;
