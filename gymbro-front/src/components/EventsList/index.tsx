import { useCallback, useEffect, useState } from "react";
import { EventUnique, EventsDTO, getEventsByUser } from "../../services/events.service";
import { Alert, Box, Button, Card, CardActions, CardContent, Grid, NoSsr, Pagination, Typography } from "@mui/material";
import { useStyles } from "./styles";
import moment from "moment";
import PublicIcon from '@mui/icons-material/Public';
import PublicOffIcon from '@mui/icons-material/PublicOff';

const EventsList: React.FC = () => {
    const classes = useStyles();

    const [userEvents, setUserEvents] = useState<EventsDTO>()
    const [currentPage, setCurrentPage] = useState(1);
    const [postPerPage] = useState(6)

    const getEvents = useCallback(() => {
        getEventsByUser().
            then(res => {
                console.log(res)
                setUserEvents(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])
    useEffect(() => {
        getEvents()
    }, [])

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
                {currentPost && (currentPost.length > 0 ? currentPost.map((event: EventUnique) =>
                (
                    <Grid item md={4} sm={12} p={1} >
                        <Card sx={{ minWidth: 275, }} className={event.isAdmin ? classes.cardAdmin : classes.card}>
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
                            <CardActions sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <Button className={classes.btnAdd} size="small">Ver mais</Button>
                            </CardActions>
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

            </Grid>
        </>
    )
}

export default EventsList;