import { Box, Button, Modal, Typography } from "@mui/material"
import { useEffect, useState } from "react";
import { getEventsById } from "../../services/events.service";
import { EventByIdDTO } from "../../models/Events";
import PublicIcon from '@mui/icons-material/Public';
import PublicOffIcon from '@mui/icons-material/PublicOff';
import { useBackdrop } from "../../hooks/backdrop";
import axios from 'axios';
import moment from 'moment';
import './styles.css'

interface Address {
    road: string;
    suburb: string;
    city: string;
    state: string;
    postcode: string;
    country: string;
}

export interface PopUpEventsDTO {
    title: string;
    date: string;
    id: number;
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const PopUpEvents: React.FC<PopUpEventsDTO> = ({ title, date, id }) => {
    const [open, setOpen] = useState(false);
    const [eventById, setEventById] = useState<EventByIdDTO>()
    const { handleBackdrop } = useBackdrop();
    const [address, setAddress] = useState<string>()

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    async function reverseGeocode(latitude: number, longitude: number): Promise<string> {
        const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`;

        try {
            const response = await axios.get(url);
            const address: Address = response.data.address;
            return `${address.road}, ${address.suburb}, ${address.city} - ${address.state} , ${address.country}`;
        } catch (error) {
            console.error(error);
            return '';
        }
    }

    const handleEventsId = () => {
        handleBackdrop(true)
        getEventsById(id)
            .then((res) => {
                setEventById(res?.data!)
            })
            .catch(err => {
                console.log(err)
                handleBackdrop(false)
            })
    }

    useEffect(() => {
        if (eventById) {
            reverseGeocode(eventById.event.geocode[0], eventById.event.geocode[1])
                .then(res => {
                    setAddress(res)
                    handleBackdrop(false)
                })
                .catch(err => {
                    console.log(err)
                    handleBackdrop(false)
                })
        }
    }, [eventById])

    return (
        <>
            <Box sx={{ minWidth: '140px' }}>
                <Typography
                    variant="h6"
                    sx={{ textAlign: 'left', color: 'primary.main' }}
                >
                    {title}
                </Typography>
                <Typography
                    variant="body1"
                    sx={{ textAlign: 'left', color: 'secondary.light' }}
                >
                    {moment(eventById?.event.eventDate).format('DD/MM/YYYY')}
                </Typography>
                <Box
                    sx={{ display: 'flex', justifyContent: 'right' }}
                >
                    <Button
                        onClick={() => {
                            handleOpen()
                            handleEventsId()
                        }}
                        sx={{ color: 'white', backgroundColor: 'secondary.main', '&:hover': { backgroundColor: 'secondary.main' } }}
                    >
                        Ver mais
                    </Button>
                </Box>
            </Box>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography variant="h4" gutterBottom>{eventById?.event.title}</Typography>
                    <Typography variant="body1">{eventById?.event.description}</Typography>
                    <Typography sx={{ mt: 2 }}><b>Data:</b> {moment(eventById?.event.eventDate).format('DD/MM/YYYY')}</Typography>
                    <Typography sx={{ mt: 2 }}><b>Horário:</b> {moment(eventById?.event.eventDate).format('HH:MM')}</Typography>
                    <Typography sx={{ mt: 2 }}>
                        {eventById?.event.isPublic ?
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <PublicIcon /><Typography sx={{ display: 'inline', marginLeft: 2 }}>Público</Typography>
                            </Box>
                            :
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <PublicOffIcon /><Typography sx={{ display: 'inline', marginLeft: 2 }}>Privado</Typography>
                            </Box>
                        }
                    </Typography>
                    <Typography sx={{ mt: 2 }}>Local: {address}</Typography>
                    {
                        eventById?.isAdmin ?
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <Button sx={{ backgroundColor: '#F00E3D', color: 'white','&:hover':{backgroundColor:'#F00E3D'} }}>Editar Evento</Button>
                            </Box> :
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <Button sx={{ backgroundColor: '#6A19E3', color: 'white','&:hover':{backgroundColor:'#C90FFA'} }}>Entrar</Button>
                            </Box>
                    }
                </Box>
            </Modal>
        </>
    )
}

export default PopUpEvents
