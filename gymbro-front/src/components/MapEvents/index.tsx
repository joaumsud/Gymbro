import './style.css'
import "leaflet/dist/leaflet.css";
import { Divider, Grid, TextField, Typography } from "@mui/material";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from 'react-leaflet-cluster'
import { Icon, LatLngExpression } from 'leaflet';
import { Events } from '../../models/Events';
import { useCallback, useEffect, useState, useLayoutEffect } from 'react';
import { EventsDTO, getEvents } from '../../services/events.service';
import PopUpEvents from '../PopUpEvents';
import { useBackdrop } from '../../hooks/backdrop';
import { useFeedback } from '../../hooks/addFeedback';
import iconGym from '../../../assets/location2.png'

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

    const customMarkerIcon = new Icon({
        iconUrl: iconGym,
        iconSize: [45, 45]
    });

    return (
        <>
            <MapContainer
                center={[-22.7999744, -45.2001792]}
                zoom={13}
                scrollWheelZoom={true}
            >
                <TileLayer
                    url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <MarkerClusterGroup
                    chunkedLoading
                    maxClusterRadius={150}
                    spiderfyOnMaxZoom={true}
                    showCoverageOnHover={true}
                >

                    {
                        markers?.events && markers.events!.map((marker: any) => (
                            <Marker position={marker.geocode} key={marker.id} icon={customMarkerIcon}>
                                <Popup>
                                    <PopUpEvents title={marker.title} date={marker.eventDate} id={marker.id} deleteEventInPop={deleteEventInPop} />
                                </Popup>
                            </Marker>
                        ))
                    }
                </MarkerClusterGroup>

            </MapContainer>
        </>
    );
}

export default MapEvents;
