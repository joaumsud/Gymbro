import { Button, Modal, Box, Typography, Grid, TextField } from "@mui/material";
import React, { useState } from "react";
import './style.css'
import { useForm, SubmitHandler } from "react-hook-form";

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


const ModalCreateEvent: React.FC = () => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>
            <div>
                <Grid>
                    <Button onClick={handleOpen} className="btn-add" >Criar Evento</Button>
                </Grid>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <form>
                            <TextField id="outlined-basic" label="Outlined" variant="outlined" />
                        </form>
                    </Box>
                </Modal>
            </div>
        </>
    )
}

export default ModalCreateEvent