import { Box, Button, Modal, Typography } from "@mui/material"
import { useEffect, useState } from "react";
import { getEventsById } from "../../services/events.service";

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
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [eventDate, setEventDate] = useState('')
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

    const handleEventsId = () => {
        getEventsById(id)
        .then(res=>{
            console.log(res.data)
        })
        .catch(err=>{

        })
    }

    const dateEvent = new Date(date)
    useEffect(() => {
        setEventDate(((dateEvent.getDate() + " " + meses[(dateEvent.getMonth())] + " " + dateEvent.getFullYear())))
    }, [])

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
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Text in a modal
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                    </Typography>
                </Box>
            </Modal>
        </>
    )
}

export default PopUpEvents