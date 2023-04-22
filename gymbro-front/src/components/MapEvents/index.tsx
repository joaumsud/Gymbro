import './style.css'
import { Grid, TextField } from "@mui/material";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";


const MapEvents = () => {
    return (
        <>
            <Grid container className='container-inputs'>
                <Grid item xs={12} className='inputs'>
                    <TextField className='text-inputs' type="text" placeholder="Localização" />
                </Grid>
                <Grid item xs={12} className='inputs'>
                    <TextField className='text-inputs' type="text" placeholder="Tipo de Evento" />
                </Grid>
            </Grid>
            <Grid className='container-map'>
                <MapContainer center={[-22.812028708655735, -45.19140005961926]} zoom={13}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
            </MapContainer>
            </Grid>
            
        </>
    );
}

export default MapEvents;
