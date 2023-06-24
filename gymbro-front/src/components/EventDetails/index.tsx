import {
    Box,
    Modal,
    Skeleton,
    Typography
} from "@mui/material"
import React, { useState } from "react"
import PublicIcon from "@mui/icons-material/Public";
import PublicOffIcon from "@mui/icons-material/PublicOff";
import { EventUnique } from "../../services/events.service";
import EventParticipants from "../EventParticipants";
import moment from "moment";

interface EventDetailsProps {
    openEventDetails: boolean;
    handleCloseEventDetails: () => void;
    event: EventUnique;
}

const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    maxHeight: '90%',
    overflowY: 'scroll',
};

const EventDetails: React.FC<EventDetailsProps> = ({ openEventDetails, handleCloseEventDetails, event }) => {
    const [open, setOpen] = useState(false);
    const [loadingCard, setLoadingCard] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return (
        <>
            <Modal
                open={openEventDetails}
                onClose={handleCloseEventDetails}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    {loadingCard ? (
                        <>
                            <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                            <Skeleton variant="rectangular" width={210} height={200} />
                            <Skeleton variant="rounded" width={210} height={200} />
                        </>
                    ) : (
                        <>
                            <Typography variant="h4" gutterBottom>
                                {event?.title}
                            </Typography>
                            <Typography variant="body1">
                                {event?.description}
                            </Typography>
                            <Typography sx={{ mt: 2 }}>
                                <b>Data:</b>{" "}
                                {moment(event?.eventDate).format("DD/MM/YYYY")}
                            </Typography>
                            <Typography sx={{ mt: 2 }}>
                                <b>Horário:</b>{" "}
                                {moment(event?.eventDate).format("HH:mm")}
                            </Typography>
                            <Typography sx={{ mt: 2 }}>
                                {event?.isPublic ? (
                                    <Box sx={{ display: "flex", alignItems: "center" }}>
                                        <PublicIcon />
                                        <Typography sx={{ display: "inline", marginLeft: 2 }}>
                                            Público
                                        </Typography>
                                    </Box>
                                ) : (
                                    <Box sx={{ display: "flex", alignItems: "center" }}>
                                        <PublicOffIcon />
                                        <Typography sx={{ display: "inline", marginLeft: 2 }}>
                                            Privado
                                        </Typography>
                                    </Box>
                                )}
                            </Typography>
                            <Typography sx={{ mt: 2 }}>Local: {event.address}</Typography>
                            {/* Listagem de participantes */}
                            {
                                <EventParticipants
                                    idEvent={event.id}
                                />
                            }

                        </>
                    )}
                </Box>
            </Modal>
        </>
    )
}

export default EventDetails