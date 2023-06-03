import {
    Alert,
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Fade,
    IconButton,
    Modal,
    Skeleton,
    Slide,
    Tooltip,
    Typography
} from "@mui/material"
import { forwardRef, useEffect, useState } from "react";
import { deleteEvent, getEventsById, joinEvent } from "../../services/events.service";
import { EventByIdDTO } from "../../models/Events";
import PublicIcon from '@mui/icons-material/Public';
import PublicOffIcon from '@mui/icons-material/PublicOff';
import { useBackdrop } from "../../hooks/backdrop";
import axios from 'axios';
import moment from 'moment';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { TransitionProps } from "@mui/material/transitions";
import { useStyles } from "./styles";
import InputIcon from '@mui/icons-material/Input';
import { useFeedback } from "../../hooks/addFeedback";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

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
    deleteEventInPop?: () => void
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

const Transition = forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const PopUpEvents: React.FC<PopUpEventsDTO> = ({ title, date, id, deleteEventInPop }) => {
    const classes = useStyles()

    const [open, setOpen] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [eventById, setEventById] = useState<EventByIdDTO>()
    const [address, setAddress] = useState<string>()
    const [idEvent, setIdEvent] = useState<number>()
    const [loadingCard, setLoadingCard] = useState(false);
    const { handleBackdrop } = useBackdrop();
    const { addFedback } = useFeedback()

    const handleClickOpen = () => {
        setOpenDialog(true);
    };

    const handleClickClose = () => {
        setOpenDialog(false);
    };

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
        setLoadingCard(true);
        getEventsById(id)
            .then((res) => {
                setEventById(res?.data!)
            })
            .catch(err => {
                addFedback({
                    description: `Erro ao carregar os detalhes do evento`,
                    typeMessage: 'error'
                })
                handleBackdrop(false)
            })
            .finally(() => setLoadingCard(false))
    }

    const deleteEventById = (eventId: number) => {
        handleBackdrop(true)
        deleteEvent(eventId)
            .then(res => {
                addFedback({
                    description: `${res.data.message}`,
                    typeMessage: 'success'
                })
                deleteEventInPop && deleteEventInPop()
            })
            .catch(err => {
                addFedback({
                    description: `${err.data.message}`,
                    typeMessage: 'error'
                })
                handleBackdrop(false)
            })
    }

    const handleJoinEvent = (eventId: number) => {
        handleBackdrop(true)
        joinEvent(eventId)
            .then(res => {
                handleBackdrop(false)
                handleClose()
                addFedback({
                    description: `${res.data.message}!`,
                    typeMessage: 'success'
                })
            })
            .catch(err => {
                handleBackdrop(false)
                handleClose()
                addFedback({
                    description: `${err.data.message}!`,
                    typeMessage: 'error'
                })
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
                    {moment(date).format('DD/MM/YYYY HH:mm')}
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
                    {loadingCard ? (
                        <>
                            <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                            <Skeleton variant="rectangular" width={210} height={200} />
                            <Skeleton variant="rounded" width={210} height={200} />
                        </>) : (
                        <>
                            <Typography variant="h4" gutterBottom>{eventById?.event.title}</Typography>
                            <Typography variant="body1">{eventById?.event.description}</Typography>
                            <Typography sx={{ mt: 2 }}><b>Data:</b> {moment(eventById?.event.eventDate).format('DD/MM/YYYY')}</Typography>
                            <Typography sx={{ mt: 2 }}><b>Horário:</b> {moment(eventById?.event.eventDate).format('HH:mm')}</Typography>
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
                                    (
                                        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                            {/* <Button sx={{ backgroundColor: '#F00E3D', color: 'white', '&:hover': { backgroundColor: '#F00E3D' } }}>Editar Evento</Button> */}
                                            <Tooltip
                                                title="Deletar"
                                                placement="top"
                                                arrow
                                                TransitionComponent={Fade}
                                                TransitionProps={{ timeout: 400 }}
                                            >
                                                <IconButton
                                                    aria-label="delete"
                                                    size="large"
                                                    onClick={() => {
                                                        handleClickOpen()
                                                        setIdEvent(eventById.event.id)
                                                    }}
                                                    className={classes.btnDelete}
                                                >
                                                    <DeleteIcon fontSize="inherit" />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip
                                                title="Editar"
                                                placement="top"
                                                arrow
                                                TransitionComponent={Fade}
                                                TransitionProps={{ timeout: 400 }}
                                            >
                                                <IconButton
                                                    aria-label="edit"
                                                    size="large"
                                                    className={classes.btnEdit}
                                                >
                                                    <EditIcon fontSize="inherit" />
                                                </IconButton>
                                            </Tooltip>
                                        </Box>
                                    ) : (

                                        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                            {/* <Button sx={{ backgroundColor: '#6A19E3', color: 'white', '&:hover': { backgroundColor: '#C90FFA' } }}>Entrar</Button> */}
                                            {!eventById?.isParticipant ? (
                                                <>
                                                    <Tooltip
                                                        title="Entrar no evento"
                                                        placement="top"
                                                        arrow
                                                        TransitionComponent={Fade}
                                                        TransitionProps={{ timeout: 400 }}
                                                    >
                                                        <IconButton
                                                            aria-label="join"
                                                            size="large"
                                                            className={classes.btnEdit}
                                                            onClick={() => {
                                                                eventById?.event.id && handleJoinEvent(eventById?.event.id)
                                                            }}
                                                        >
                                                            <InputIcon fontSize="large" />
                                                        </IconButton>
                                                    </Tooltip>
                                                </>
                                            ) : (
                                                <>
                                                    <Tooltip
                                                        title="Sair do evento"
                                                        placement="top"
                                                        arrow
                                                        TransitionComponent={Fade}
                                                        TransitionProps={{ timeout: 400 }}
                                                    >
                                                        <IconButton
                                                            aria-label="leave"
                                                            size="large"
                                                            className={classes.btnDelete}
                                                            onClick={() => {
                                                                // eventById?.event.id && handleJoinEvent(eventById?.event.id)
                                                            }}
                                                        >
                                                            <HighlightOffIcon fontSize="large" />
                                                        </IconButton>
                                                    </Tooltip>
                                                </>
                                            )}
                                        </Box>
                                    )
                            }
                        </>
                    )}
                </Box>
            </Modal>
            <Dialog
                open={openDialog}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
                sx={{ zIndex: '2000' }}
            >
                <DialogTitle>Deseja excluir o evento?</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <Alert severity="warning">Excluir o evento é uma ação irreversível, tenha certeza ao executar!</Alert>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handleClickClose}
                        variant="outlined"
                        className={classes.btnDialogCancel}
                    >Cancelar</Button>
                    <Button
                        onClick={() => {
                            handleClickClose()
                            idEvent && deleteEventById(idEvent)
                        }}
                        className={classes.btnDialogDelete}
                    >
                        Excluir
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default PopUpEvents
