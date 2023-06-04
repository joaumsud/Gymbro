import { useCallback, useEffect, useState, forwardRef } from "react";
import { EventUnique, EventsDTO, deleteEvent, getEventsByUser } from "../../services/events.service";
import { Alert, Box, Button, Card, CardActions, CardContent, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Fade, Grid, IconButton, Pagination, Skeleton, Slide, Tooltip, Typography } from "@mui/material";
import { useStyles } from "./styles";
import moment from "moment";
import PublicIcon from '@mui/icons-material/Public';
import PublicOffIcon from '@mui/icons-material/PublicOff';
import { useBackdrop } from '../../hooks/backdrop';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import theme from "../../theme";
import { TransitionProps } from '@mui/material/transitions';
import CustomSkeleton from "../Skeleton";
import { useFeedback } from "../../hooks/addFeedback";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import FeedIcon from '@mui/icons-material/Feed';
import DialogLaveEvent from "../DialogLeaveEvent";

const Transition = forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});


const EventsList: React.FC = () => {
    const classes = useStyles();

    const [open, setOpen] = useState(false);
    const [userEvents, setUserEvents] = useState<EventsDTO>()
    const [currentPage, setCurrentPage] = useState(1);
    const [postPerPage] = useState(6)
    const [loadingCard, setLoadingCard] = useState(false);
    const [idEvent, setIdEvent] = useState<number>(1)
    const [openLeaveDialog, setOpenLeaveDialog] = useState(false)

    const { handleBackdrop } = useBackdrop()
    const { addFedback } = useFeedback()

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpenLeaveDialog = () => {
        setOpenLeaveDialog(true);
    };

    const handleCloseLeaveDialog = () => {
        setOpenLeaveDialog(false);
    };

    const getEvents = useCallback(() => {
        handleBackdrop(true)
        setLoadingCard(true);
        getEventsByUser().
            then(res => {
                handleBackdrop(false)
                setUserEvents(res.data)
            })
            .catch(err => {
                addFedback({
                    description: 'Erro ao exibir os eventos!',
                    typeMessage: 'error'
                })
                handleBackdrop(false)
            })
            .finally(() => {
                setLoadingCard(false);
            })
    }, [])

    useEffect(() => {
        getEvents()
    }, [])

    const deleteEventById = (eventId: number) => {
        handleBackdrop(true)
        deleteEvent(eventId)
            .then(res => {
                getEvents()
                addFedback({
                    description: 'Evento excluído com sucesso!',
                    typeMessage: 'success'
                })
            })
            .catch(err => {
                handleBackdrop(false)
                addFedback({
                    description: 'Erro ao excluir o evento!',
                    typeMessage: 'success'
                })
            })
    }

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value);
    };

    const indexOfLastPost = currentPage * postPerPage;
    const indexOfFirstPost = indexOfLastPost - postPerPage;
    const currentPost = userEvents?.events.slice(indexOfFirstPost, indexOfLastPost);
    const totalPages = userEvents && Math.ceil(userEvents?.events.length / postPerPage);

    return (
        <>
            <Grid container>
                {loadingCard ?
                    <CustomSkeleton />
                    : (
                        <>
                            {currentPost && (currentPost.length > 0 ? currentPost.map((event: EventUnique) =>
                            (
                                <Grid item md={6} sm={12} p={1} lg={4} key={event.id}>
                                    <Card sx={{ minWidth: 275, }}
                                        className={
                                            event.isAdmin ?
                                                classes.cardAdmin :
                                                classes.card}
                                    >
                                        <Typography textAlign='center' variant="h5" gutterBottom>
                                            {event.title}
                                        </Typography>
                                        <Box className={classes.ribbon} bgcolor={event.isAdmin ? '#C90FFA' : '#110FFA'} margin={0} py={1}>
                                            <Typography variant="h6" component="div">
                                                {moment(event.eventDate).format('DD - MM - YYYY, HH:mm')}
                                            </Typography>
                                        </Box>
                                        <CardContent>
                                            {/* <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                    { }
                                </Typography> */}
                                            {event.isPublic ?
                                                <Box sx={{ display: 'flex', alignItems: 'center' }} my={1}>
                                                    <PublicIcon /><Typography sx={{ display: 'inline', marginLeft: 2 }}>Público</Typography>
                                                </Box>
                                                :
                                                <Box sx={{ display: 'flex', alignItems: 'center' }} my={1}>
                                                    <PublicOffIcon /><Typography sx={{ display: 'inline', marginLeft: 2 }}>Privado</Typography>
                                                </Box>
                                            }
                                            <Typography variant="body2">
                                                {event.description.length > 39
                                                    ? `${event.description.slice(0, 40)} ...`
                                                    : `${event.description.slice(0, 40)}`}
                                            </Typography>
                                        </CardContent>
                                        {event.isAdmin ?
                                            (<CardActions sx={{ display: 'flex', justifyContent: 'flex-end' }}>
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
                                                            setIdEvent(event.id)
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

                                            </CardActions>)
                                            : (<CardActions sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                                {/* <Button className={classes.btnView} size="small">Ver mais</Button> */}
                                                <Tooltip
                                                    title="Sair do Evento"
                                                    placement="top"
                                                    arrow
                                                    TransitionComponent={Fade}
                                                    TransitionProps={{ timeout: 400 }}
                                                >
                                                    <IconButton
                                                        aria-label="delete"
                                                        size="large"
                                                        onClick={() => {
                                                            handleOpenLeaveDialog()
                                                            setIdEvent(event.id)
                                                        }}
                                                        className={classes.btnDelete}
                                                    >
                                                        <HighlightOffIcon fontSize="inherit" />
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip
                                                    title="Detalhes"
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
                                                        <FeedIcon fontSize="inherit" />
                                                    </IconButton>
                                                </Tooltip>
                                            </CardActions>)
                                        }

                                    </Card>
                                </Grid>
                            ))
                                : (
                                    <Alert severity="error" sx={{ width: '80vw' }}>Não há eventos associados a esta conta!</Alert>
                                ))}
                            {currentPost && currentPost.length > 0 ? (totalPages && totalPages > 1 && (
                                <Grid xs={12} sm={12} item
                                    className={classes.pagination}
                                >
                                    <Pagination
                                        count={totalPages}
                                        page={currentPage}
                                        onChange={handleChange}
                                    />
                                </Grid>
                            )) : null}
                        </>
                    )}

            </Grid>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>Deseja excluir o evento?</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <Alert severity="warning">Excluir o evento é uma ação irreversível, tenha certeza ao executar!</Alert>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} variant="outlined" className={classes.btnDialogCancel}>Cancelar</Button>
                    <Button
                        onClick={() => {
                            handleClose()
                            idEvent && deleteEventById(idEvent)
                        }}
                        className={classes.btnDialogDelete}
                    >
                        Excluir
                    </Button>
                </DialogActions>
            </Dialog>
            <DialogLaveEvent
                eventId={idEvent}
                open={openLeaveDialog}
                handleClose={handleCloseLeaveDialog}
                refreshEvents={getEvents}
                changePage={setCurrentPage}
            />
        </>
    )
}

export default EventsList;