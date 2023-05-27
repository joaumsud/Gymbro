import { Button, Modal, Box, Typography, Grid, TextField } from "@mui/material";
import React, { useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import useStyles from "./styles";

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
    const classes = useStyles()
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [title, setTitle] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [eventDate, setEventDate] = useState<string>('')


    const { handleSubmit, control, reset } = useForm();

    return (
        <>
            <div>
                <Grid>
                    <Button onClick={handleOpen} className={classes.btnAdd} >Criar Evento</Button>
                </Grid>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <form>
                            <Controller
                                control={control}
                                rules={{
                                    required: true,
                                }}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <TextField
                                        label="Título"
                                        variant="outlined"
                                        value={title}
                                        onChange={(e) => {
                                            setTitle(e.target.value)
                                        }}
                                    />
                                )}
                                name="title"
                            />

                            <Controller
                                control={control}
                                rules={{
                                    required: true,
                                }}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <TextField
                                        label="Descrição"
                                        variant="outlined"
                                        value={description}
                                        onChange={(e) => {
                                            setTitle(e.target.value)
                                        }}
                                    />
                                )}
                                name="description"
                            />

                            {/* <Controller
                                control={control}
                                rules={{
                                    required: true,
                                }}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <DatePicker
                                        label="Controlled picker"
                                        value={eventDate}
                                        onChange={(e) => setEventDate(e.target.value)}
                                    />
                                )}
                                name="description"
                            /> */}

                        </form>
                    </Box>
                </Modal>
            </div>
        </>
    )
}

export default ModalCreateEvent