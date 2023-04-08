import { Grid, TextField } from "@mui/material";
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { useCallback,useState } from "react";
import { getToken } from "../../services/auth.service";

const containerStyle = {
    width: '400px',
    height: '400px'
};

const center = {
    lat: -3.745,
    lng: -38.523
};

const Dash = () => {

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: getToken()
    })

    const [map, setMap] = useState(null)

    const onLoad = useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds(center);
        map.fitBounds(bounds);

        setMap(map)
    }, [])

    const onUnmount = useCallback(function callback(map: any) {
        setMap(null)
    }, [])


    return (
        <>
            <Grid container >
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <TextField type="text" placeholder="Localização" />
                </Grid>
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <TextField type="text" placeholder="Tipo de Evento" />
                </Grid>
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>

                    {
                        isLoaded ? (
                            <GoogleMap
                                mapContainerStyle={containerStyle}
                                center={center}
                                zoom={10}
                                onLoad={onLoad}
                                onUnmount={onUnmount}
                            >
                                <></>
                            </GoogleMap>
                        ) : <></>
                    }

                </Grid>
            </Grid>
        </>
    );
}

export default Dash;
