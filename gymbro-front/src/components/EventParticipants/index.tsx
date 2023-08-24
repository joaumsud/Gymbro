import { Box, Button, Divider, Modal, Skeleton, Typography } from "@mui/material"
import GroupIcon from '@mui/icons-material/Group';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import { useCallback, useEffect, useState } from "react";
import { getEventParticipants } from "../../services/events.service";
import { useBackdrop } from "../../hooks/backdrop";
import { useFeedback } from "../../hooks/addFeedback";
import { User } from "../PopUpEvents";
import { useStyles } from "./styles";

export interface EventParticipantsProps {
    idEvent: number
}

const EventParticipants: React.FC<EventParticipantsProps> = ({ idEvent }) => {
    // Estados relacionados a listagem de usuários participantes do evento
    const [openParticipantsList, setOpenParticipantsList] = useState(false);
    const [eventParticipants, setEventParticipants] = useState<User[]>([]);
    const [eventAdmin, setEventAdmin] = useState<User>();
    const [errorOnList, setErrorOnList] = useState(false);
    const [loadingCard, setLoadingCard] = useState(false);
    const { handleBackdrop } = useBackdrop();
    const { addFedback } = useFeedback();

    const classes = useStyles()

    const getParticipants = useCallback(() => {
        handleBackdrop(true)
        setLoadingCard(true)
        getEventParticipants(idEvent)
            .then((res) => {
                setErrorOnList(false);
                setLoadingCard(false)
                handleBackdrop(false)
                setEventParticipants(res?.data.participants);
                setEventAdmin(res?.data.admin);
            })
            .catch(() => {
                addFedback({
                    description: `Erro ao carregar os detalhes do evento`,
                    typeMessage: "error",
                });
                handleBackdrop(false)
            });
    }, [idEvent])
    useEffect(() => {
        getParticipants()
    }, [idEvent])
    return (
        <>
            {/* Listagem de participantes */}
            {
                loadingCard ? (
                    <>
                        <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                        <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                        <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                        <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                    </>
                ) : (
                    <>
                        <div className={classes.divStyle}>
                            <Typography variant="h6">Administrador <SupportAgentIcon sx={{ color: '#C90FFA' }}/></Typography>
                            <Typography>
                                {eventAdmin?.firstName + " " + eventAdmin?.lastName}
                            </Typography>

                            <Typography variant="h6" marginTop={1}>
                                Participantes <GroupIcon sx={{ color: '#110FFA' }}/>
                            </Typography>
                            {eventParticipants.length === 0 ? (
                                <Typography>Ainda não há participantes</Typography>
                            ) : (
                                eventParticipants
                                    .slice(0, 3)
                                    ?.map((participant) => (
                                        <Typography key={participant.id}>
                                            {participant.firstName + " " + participant.lastName}
                                        </Typography>
                                    ))
                            )}
                            {eventParticipants.length > 2 && (
                                <Button onClick={() => setOpenParticipantsList(true)} className={classes.btnList}>ver mais...</Button>
                            )}

                            {/* Modal para listar todos participantes */}
                            <Modal
                                open={openParticipantsList}
                                onClose={() => setOpenParticipantsList(false)}
                            >
                                <Box className={classes.modalParticipants}>
                                    <Typography variant="h6">Administrador <SupportAgentIcon sx={{ color: '#C90FFA' }}/></Typography>
                                    <Box sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        padding: '5px',
                                    }}>
                                        <Box className={classes.boxImgs}>
                                            <img
                                                src="https://picsum.photos/200/200"
                                                loading="lazy"
                                                className={classes.picsProfiles}
                                            />
                                        </Box>
                                        <Typography sx={{ m: '0px 15px' }}>
                                            {eventAdmin?.firstName + " " + eventAdmin?.lastName}
                                        </Typography>
                                    </Box>
                                    <Typography variant="h6" marginTop={1}>
                                        Participantes <GroupIcon sx={{ color: '#110FFA' }} />
                                    </Typography>

                                    <Box className={classes.boxParticipants}>
                                        {
                                            eventParticipants?.map((participant) => (
                                                <>
                                                    <Box className={classes.containerProfiles}>
                                                        <Box className={classes.boxImgs}>
                                                            <img
                                                                src="https://picsum.photos/201/201"
                                                                loading="lazy"
                                                                className={classes.picsProfiles}
                                                            />
                                                        </Box>
                                                        <Typography key={participant.id} sx={{ m: '0px 15px' }}>
                                                            {participant.firstName + " " + participant.lastName}
                                                        </Typography>
                                                    </Box>
                                                    <Divider />
                                                </>
                                            ))
                                        }
                                    </Box>

                                </Box>
                            </Modal>
                        </div>
                    </>
                )
            }
        </>
    )
}

export default EventParticipants;