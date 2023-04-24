import './style.css'
import "leaflet/dist/leaflet.css";
import { Grid, TextField } from "@mui/material";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import { Icon } from 'leaflet';
import { Events } from '../../models/Events';
import { useEffect, useState } from 'react';
import { ModalCreateEvent } from '../ModalCreateEvent';


const MapEvents = () => {
    const [markers, setMarkers] = useState<Events[]>([])

    useEffect(() => {
        setMarkers([
            {
                id: 10,
                title: "Evento 1",
                description: "Some description",
                eventDate: "2023-04-24T15:43:40.783Z",
                isPublic: true,
                hasLimit: true,
                limitCount: 10,
                isActive: true,
                adminId: 11,
                geocode: [48.86, 2.3522],
            },
            {
                id: 11,
                title: "Evento 2",
                description: "Some description",
                eventDate: "2023-04-26T15:43:40.783Z",
                isPublic: true,
                hasLimit: true,
                limitCount: 10,
                isActive: true,
                adminId: 11,
                geocode: [48.85, 2.3522],
            },
            {
                id: 12,
                title: "Evento 2",
                description: "Some description",
                eventDate: "2023-05-26T15:43:40.783Z",
                isPublic: true,
                hasLimit: true,
                limitCount: 10,
                isActive: true,
                adminId: 11,
                geocode: [48.855, 2.34],
            }
        ])
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
                                    <h2>{marker.description}</h2>
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
