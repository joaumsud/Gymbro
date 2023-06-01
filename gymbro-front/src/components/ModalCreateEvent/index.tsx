import { Button, Modal, Box, Typography, Grid, TextField, Checkbox, Divider, InputLabel, Alert } from "@mui/material";
import React, { forwardRef, useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import useStyles from "./styles";
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import { postEvents } from "../../services/events.service";
import { CreateEventDTO } from "../../models/Events";
import Backdrop from '@mui/material/Backdrop';
import ptBR from 'date-fns/locale/pt-BR'
import moment from "moment";



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

    const { handleSubmit, control, reset } = useForm();

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

    const onSubmit = () => {
        console.log(startDate)
        const data = {
            title: title,
            description: description,
            // eventDate: startDate.toString(),
            eventDate: `${moment(startDate.toString()).format('YYYY-MM-DD')}T${moment(startDate.toString()).format("HH:mm:ss")}Z`,
            isPublic: isPublic,
            hasLimit: hasLimit,
            limitCount: limitCount,
            geocode: markerLocation!,
        }

        postEvents(data)
            .then(res => {

            })
            .catch(err => {

            })
    }

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
                    closeAfterTransition
                    slots={{ backdrop: Backdrop }}
                    slotProps={{
                        backdrop: {
                            timeout: 500,
                        },
                    }}
                >
                    <Box sx={style} className={classes.modalStyle}>
                        <Typography variant="h5">Crie seu evento aqui!</Typography>
                        <Divider />

                        <form className={classes.formStyle} onSubmit={handleSubmit(onSubmit)}>
                            <Grid container>
                                <Grid item md={10} sm={12} className={classes.boxInputsStyle}>
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
                                </Grid>
                                <Grid item md={2} sm={12} className={classes.boxInputsLimitStyle}>
                                    <Controller
                                        control={control}
                                        rules={{
                                            required: true,
                                        }}
                                        render={({ field: { onChange, onBlur, value } }) => (
                                            <Checkbox
                                                sx={{ p: 0 }}
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
                                                sx={{ ml: 2 }}
                                                disabled={!hasLimit ?? true}
                                                label="Limite"
                                                variant="outlined"
                                                type="number"
                                                value={limitCount}
                                                onChange={handleLimitCount}
                                            />
                                        )}
                                        name="limitCount"
                                    />
                                </Grid>
                                <Grid item md={12} sm={12} className={classes.boxInputsStyle}>
                                    <Controller
                                        control={control}
                                        rules={{
                                            required: true,
                                        }}
                                        render={({ field: { onChange, onBlur, value } }) => (
                                            <TextField
                                                sx={{ width: '100%' }}
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

                                </Grid>
                                <Grid item md={6} sm={12} className={classes.boxInputsStyle}>
                                    <Controller
                                        control={control}
                                        rules={{
                                            required: true,
                                        }}
                                        render={({ field: { onChange, onBlur, value } }) => (
                                            <DatePicker
                                                popperClassName="some-custom-class"
                                                popperPlacement="top-start"
                                                showTimeSelect
                                                dateFormat="dd/MM/yyyy HH:mm"
                                                timeFormat="HH:mm"
                                                locale={ptBR}
                                                minDate={new Date()}
                                                popperModifiers={[
                                                    {
                                                        name: "offset",
                                                        options: {
                                                            offset: [5, 10],
                                                        },
                                                    },
                                                    {
                                                        name: "preventOverflow",
                                                        options: {
                                                            rootBoundary: "viewport",
                                                            tether: false,
                                                            altAxis: true,
                                                        },
                                                    },
                                                ]}
                                                selected={startDate}
                                                onChange={(e) => {
                                                    console.log(`${moment(e).format('YYYY-MM-DD')}T${moment(e).format("HH:mm:ss")}Z`)
                                                    if (e) setStartDate(e)
                                                }}
                                            />
                                        )}
                                        name="date"
                                    />
                                </Grid>
                            </Grid>
                            <Alert
                                icon={false}
                                severity="info"
                                className={classes.alertLocal}
                            >
                                <strong>Ajuda</strong>: Clique no mapa para escolher o local do evento.
                            </Alert>
                            <Box>
                                <MapContainer center={[-22.7999744, -45.2001792]} zoom={13} style={{ height: '400px' }}>
                                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                                    <LocationMarker />
                                </MapContainer>
                            </Box>
                            <Grid
                                className={classes.boxInputsStyle}
                                sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end' }}
                            >
                                <Controller
                                    control={control}
                                    rules={{
                                        required: true,
                                    }}
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <Checkbox
                                            sx={{ p: 0 }}
                                            checked={isPublic}
                                            onChange={handleCheckPublic}
                                            {...label}
                                        />
                                    )}
                                    name="isPublic"
                                />
                                <InputLabel
                                    className={classes.labelCheck}
                                    disabled={!isPublic}
                                >
                                    Evento Público
                                </InputLabel>
                            </Grid>
                            <Grid className={classes.gridBtns}>
                                <Button variant="outlined" onClick={handleClose} className={classes.btnCancel}>Cancelar</Button>
                                <Button type="submit" onClick={onSubmit} className={classes.btnAdd}>Criar Evento</Button>
                            </Grid>
                        </form>
                    </Box>
                </Modal>
            </Box>
        </>
    )
}

export default ModalCreateEvent