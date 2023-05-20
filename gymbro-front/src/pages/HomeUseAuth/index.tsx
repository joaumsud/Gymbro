import './style.css'
import MapEvents from '../../components/MapEvents';
import "leaflet/dist/leaflet.css";
import { useUserAuth } from '../../hooks/userProvider';
import { Grid } from '@mui/material';
import OnlineFriends from '../../components/OnlineFriends';

const Dash = () => {
    const { user } = useUserAuth()

    return (
        <>
            <Grid container style={{
            }}>
                <Grid item lg={1} md={1} sm={12} xs={12} style={{ border: '1px solid red' }}>
                    <OnlineFriends />
                </Grid>
                <Grid item lg={11} md={11} sm={12} xs={12}>
                    <MapEvents />
                </Grid>

            </Grid>
        </>
    );
}

export default Dash;
