import { Box, Button, Modal, Typography } from "@mui/material"
import { useEffect, useState } from "react";
import { getEventsById } from "../../services/events.service";
import { EventByIdDTO } from "../../models/Events";
import PublicIcon from '@mui/icons-material/Public';
import PublicOffIcon from '@mui/icons-material/PublicOff';
import { useBackdrop } from "../../hooks/backdrop";


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
    const [eventDate, setEventDate] = useState('')
    const { handleBackdrop } = useBackdrop();

    const meses = [
        "Janeiro",
        "Fevereiro",
        "Março",
        "Abril",
        "Maio",
        "Junho",
        "Julho",
        "Agosto",
        "Setembro",
        "Outubro",
        "Novembro",
        "Dezembro"
    ];

    const dateEvent = new Date(date)
    useEffect(() => {
        setEventDate(((dateEvent.getDate() + " " + meses[(dateEvent.getMonth())] + " " + dateEvent.getFullYear())))
    }, [])

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleEventsId = () => {
        // handleBackdrop(true)
        getEventsById(id)
            .then(res => {
                setEventById(res?.data!)
                handleBackdrop(false)
            })
            .catch(err => {
                console.log(err)
                handleBackdrop(false)
            })
    }

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
                    {eventDate}
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
                    <Typography sx={{ mt: 2 }}>{eventDate}</Typography>
                    <Typography sx={{ mt: 2 }}>
                        {eventById?.event.isPublic ? <PublicIcon /> : <PublicOffIcon />}
                    </Typography>
                    <Typography sx={{ mt: 2 }}>Local:</Typography>
                </Box>
            </Modal>
        </>
    )
}

export default PopUpEvents