import './style.css'
import MapEvents from '../../components/MapEvents';
import "leaflet/dist/leaflet.css";
import { useUserAuth } from '../../hooks/userProvider';

const Dash = () => {
    const { user } = useUserAuth()

    return (
        <>
            <MapEvents />
        </>
    );
}

export default Dash;
