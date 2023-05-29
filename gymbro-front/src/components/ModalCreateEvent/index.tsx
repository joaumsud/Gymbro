import { Button, Modal, Box, Typography, Grid, TextField, Checkbox, Divider } from "@mui/material";
import React, { useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import useStyles from "./styles";
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';


const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    // width: 550,
    // minWidth: 200,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };


const ModalCreateEvent: React.FC = () => {
    const classes = useStyles()

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [startDate, setStartDate] = useState(new Date());
    const [title, setTitle] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [isPublic, setIsPublic] = useState<boolean>(false)
    const [hasLimit, setHasLimit] = useState<boolean>(false)
    const [limitCount, setLimitCount] = useState<number | undefined>(0)
    const [markerLocation, setMarkerLocation] = useState<[number, number] | null>(null);

    const handleTitle = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setTitle(e.target.value)
    }

    const handleDescription = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setDescription(e.target.value)
    }

    const handleCheckPublic = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsPublic(event.target.checked);
    };

    const handleCheckHasLimit = (event: React.ChangeEvent<HTMLInputElement>) => {
        setHasLimit(event.target.checked);
    };

    const handleLimitCount = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setLimitCount(+e.target.value)
    }

    const handleMapClick = (event: L.LeafletMouseEvent) => {
        const { lat, lng } = event.latlng;
        setMarkerLocation([lat, lng]);
    };

    const LocationMarker = () => {
        useMapEvents({
            click: handleMapClick,
        });

        if (markerLocation) {
            return <Marker position={markerLocation} />;
        }

        return null;
    };

    const { handleSubmit, control, reset } = useForm();

    return (
        <>
            <Box >
                <Grid>
                    <Button onClick={handleOpen} className={classes.btnAdd} >Criar Evento</Button>
                </Grid>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style} className={classes.modalStyle}>
                        <Typography variant="h6">Crie seu evento aqui!</Typography>
                        <Divider />
                        <form className={classes.formStyle}>
                            <Controller
                                control={control}
                                rules={{
                                    required: true,
                                }}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <TextField
                                        className={classes.inputsStyle}
                                        label="Título"
                                        variant="outlined"
                                        value={title}
                                        onChange={handleTitle}
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
                                        className={classes.inputsStyle}
                                        label="Descrição"
                                        variant="outlined"
                                        multiline
                                        maxRows={4}
                                        value={description}
                                        onChange={handleDescription}
                                    />
                                )}
                                name="description"
                            />

                            <Controller
                                control={control}
                                rules={{
                                    required: true,
                                }}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <DatePicker
                                        showIcon
                                        selected={startDate}
                                        onChange={(e) => {
                                            if (e) setStartDate(e)
                                        }}
                                    />
                                )}
                                name="date"
                            />

                            <Controller
                                control={control}
                                rules={{
                                    required: true,
                                }}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <Checkbox
                                        checked={isPublic}
                                        onChange={handleCheckPublic}
                                        {...label}
                                    />
                                )}
                                name="isPublic"
                            />

                            <Controller
                                control={control}
                                rules={{
                                    required: true,
                                }}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <Checkbox
                                        checked={hasLimit}
                                        onChange={handleCheckHasLimit}
                                        {...label}
                                    />
                                )}
                                name="hasLimit"
                            />


                            <Controller
                                control={control}
                                rules={{
                                    required: true,
                                }}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <TextField
                                        disabled={!hasLimit ?? true}
                                        label="Descrição"
                                        variant="outlined"
                                        type="number"
                                        value={limitCount}
                                        onChange={handleLimitCount}
                                    />
                                )}
                                name="limitCount"
                            />

                            <Box>
                                <MapContainer center={[0, 0]} zoom={2} style={{ height: '400px' }}>
                                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                                    <LocationMarker />
                                </MapContainer>
                            </Box>
                            <Button>Cancelar</Button>
                            <Button type="submit">Criar Evento</Button>
                        </form>
                    </Box>
                </Modal>
            </Box>
        </>
    )
}

export default ModalCreateEvent