import { Box, Button, Grid } from '@mui/material';
import './style.css'
import ModalCreateEvent from '../../components/ModalCreateEvent';

const Events = () => {
    return (
        <div className='div-style'>
            <Box className='box-father-style'>
                <Grid style={{ display: 'flex', justifyContent: 'end', marginBottom: '10px' }}>
                    <ModalCreateEvent />
                </Grid>
                <Box className='box-style'>
                    <p>Seus Eventos aqui</p>
                </Box>
            </Box>

        </div>
    )
}

export default Events;