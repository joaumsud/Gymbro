import './style.css'
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from 'react-leaflet-cluster'
import { Icon, LatLngExpression } from 'leaflet';
import { useCallback, useEffect, useState, } from 'react';
import { EventUnique, EventsDTO, getEvents } from '../../services/events.service';
import PopUpEvents from '../PopUpEvents';
import { useBackdrop } from '../../hooks/backdrop';
import { useFeedback } from '../../hooks/addFeedback';
import iconGym from '../../../assets/location2.png'
import iconGymParticipant from '../../../assets/academia.png'
import iconGymNoParticipant from '../../../assets/academia1.png'
import { Box } from '@mui/material';

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

    const customMarkerIconParticipant = new Icon({
        iconUrl: iconGymParticipant,
        iconSize: [45, 45]
    });


    const customMarkerIconNoParticipant = new Icon({
        iconUrl: iconGymNoParticipant,
        iconSize: [45, 45]
    });

    return (
        <Box sx={{marginBottom:'0px'}}>
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
                        markers?.events && markers.events!.map((marker: EventUnique) => (
                            <Marker position={marker.geocode} key={marker.id} icon={customMarkerIcon}>
                                <Popup>
                                    <PopUpEvents title={marker.title} date={marker.eventDate} id={marker.id} deleteEventInPop={deleteEventInPop} />
                                </Popup>
                            </Marker>
                        ))
                    }
                </MarkerClusterGroup>

            </MapContainer>
        </Box>
    );
}

export default MapEvents;
