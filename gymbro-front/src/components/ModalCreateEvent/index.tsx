import { Button, Modal, Box, Typography, Grid } from "@mui/material";
import React, { useState } from "react";
import './style.css'
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


export const ModalCreateEvent: React.FC = () => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return (
        <>
            <div>
                <Grid style={{ display: 'flex', justifyContent: 'center' }}>
                    <Button onClick={handleOpen} className="btn-add">Criar Evento</Button>
                </Grid>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <form>
                            
                        </form>
                    </Box>
                </Modal>
            </div>
        </>
    )
}