import { Alert, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { forwardRef, useEffect, useState } from "react";
import { leaveEvent } from "../../services/events.service";
import { useBackdrop } from "../../hooks/backdrop";
import { useFeedback } from "../../hooks/addFeedback";
import { useStyles } from "./styles";


interface DiaogLeaveProps {
    eventId: number;
    open: boolean;
    handleClose: () => void;
    closeModalEvent?: () => void;
    refreshEvents?: () => void;
    changePage?: (page: number) => void;
}

const Transition = forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const DialogLaveEvent: React.FC<DiaogLeaveProps> = ({ eventId, open, handleClose, closeModalEvent, refreshEvents, changePage }) => {
    const classes = useStyles()

    const { handleBackdrop } = useBackdrop();
    const { addFedback } = useFeedback()

    const handleLeaveEvent = () => {
        handleBackdrop(true)
        leaveEvent(eventId)
            .then(res => {
                handleBackdrop(false)
                addFedback({
                    description: `Você saiu do evento com sucesso!`,
                    typeMessage: 'success'
                })
                changePage && changePage(1)
                closeModalEvent && closeModalEvent()
                refreshEvents && refreshEvents()
            })
            .catch(err => {
                handleBackdrop(false)
                addFedback({
                    description: `Erro ao sair do evento, tente novamente mais tarde!`,
                    typeMessage: 'error'
                })
            })
    }
    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
            sx={{ zIndex: '2000' }}
        >
            <DialogTitle>Deseja sair do evento?</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    <Alert severity="warning">Ao sair, você não receberá notificaações sobre o evento!</Alert>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={handleClose}
                    variant="outlined"
                    className={classes.btnDialogCancel}
                >
                    Cancelar
                </Button>
                <Button
                    onClick={() => {
                        handleClose()
                        handleLeaveEvent()
                    }}
                    className={classes.btnDialogDelete}
                >
                    Sair
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default DialogLaveEvent;