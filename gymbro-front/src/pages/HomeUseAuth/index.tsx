import './style.css'
import { Grid, TextField } from "@mui/material";
import { MapContainer, TileLayer } from "react-leaflet";
import MapEvents from '../../components/MapEvents';
import "leaflet/dist/leaflet.css";


const Dash = () => {



    return (
        <>
            <MapEvents />
        </>
    );
}

export default Dash;
