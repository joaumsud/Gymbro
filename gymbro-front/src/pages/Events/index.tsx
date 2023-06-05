import { Box, Button, Grid } from '@mui/material';
import './style.css'
import ModalCreateEvent from '../../components/ModalCreateEvent';
import EventsList from '../../components/EventsList';

const Events = () => {
    return (
        <div className='div-style'>
            <Box className='box-father-style'>
                <Grid style={{ display: 'flex', justifyContent: 'end', marginBottom: '10px' }} p={1}>
                    <ModalCreateEvent />
                </Grid>
                <Box className='box-style'>
                    <EventsList />
                </Box>
            </Box>
        </div>
    )
}

export default Events;