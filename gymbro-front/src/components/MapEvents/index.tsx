import './style.css'
import "leaflet/dist/leaflet.css";
import { Grid, TextField } from "@mui/material";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import { Icon } from 'leaflet';
import { Events } from '../../models/Events';
import { useCallback, useEffect, useState } from 'react';
import { getEvents } from '../../services/events.service';
import PopUpEvents from '../PopUpEvents';


const MapEvents = () => {
    const [markers, setMarkers] = useState<Events[]>([])

    const eventsList = useCallback(() => {
        getEvents()
            .then(res => {
                setMarkers(res.data)
            })
            .catch(err => { })
    }, [])

    useEffect(() => {
        eventsList()
    }, [])


    // const customIcon = new Icon({
    //     iconUrl: 'https://icons8.com.br/icon/YfjvHW1Tgpsh/gym',
    //     iconSize: [38, 38]
    // })

    return (
        <>
            <Grid container className='container-inputs'>
                {/* <Grid item xs={12} className='inputs'>
                    <TextField className='text-inputs' type="text" placeholder="Localização" />
                </Grid>
                <Grid item xs={12} className='inputs'>
                    <TextField className='text-inputs' type="text" placeholder="Tipo de Evento" />
                </Grid> */}
            </Grid>
            <Grid className='container-map'>
                <MapContainer center={[-22.812028708655735, -45.19140005961926]} zoom={13}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {
                        markers!.map(marker => (
                            <Marker position={marker.geocode} key={marker.id}>
                                <Popup>
                                    <PopUpEvents title={marker.title} date={marker.eventDate} id={marker.id} />
                                </Popup>
                            </Marker>
                        ))
                    }
                </MapContainer>
            </Grid>
        </>
    );
}

export default MapEvents;
