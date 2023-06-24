import {
    Button,
    Modal,
    Box,
    Typography,
    Grid,
    TextField,
    Checkbox,
    Divider,
    InputLabel,
    Alert,
    FormHelperText,
    Tooltip,
    IconButton,
    Fade
} from "@mui/material";
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import useStyles from "./styles";
import 'react-datepicker/dist/react-datepicker.css';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import Backdrop from '@mui/material/Backdrop';
import { DatePicker, LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { validationSchema } from "./ValidationSchema";
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import moment from "moment";
import { postEvents } from "../../services/events.service";
import { useBackdrop } from "../../hooks/backdrop";
import { useFeedback } from "../../hooks/addFeedback";
import { Address } from "../PopUpEvents";
import axios from "axios";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
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
    const { handleBackdrop } = useBackdrop();
    const { addFedback } = useFeedback()

    const { handleSubmit, control, watch, setValue, reset, formState: { errors } } = useForm<any>({
        resolver: yupResolver(validationSchema)
    });

    async function reverseGeocode(latitude: number, longitude: number): Promise<string> {
        const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`;

        try {
            const response = await axios.get(url);
            const address: Address = response.data.address;
            return `${address.road}, ${address.suburb}, ${address.city} - ${address.state} , ${address.country}`;
        } catch (error) {
            console.error(error);
            return '';
        }
    }

    const LocationMarker = ({ control }: any) => {
        const [markerLocation, setMarkerLocation] = useState(null);

        const handleMapClick = (e: any) => {
            const { lat, lng } = e.latlng;
            const location: any = [lat, lng];
            setMarkerLocation(location);
            setValue('location', location);
        };
        //está pegando qualquer click no formulário
        useMapEvents({
            click: handleMapClick,
        });

        return markerLocation ? <Marker position={markerLocation} /> : null
    };


    const onSubmit = (data: any) => {
        handleBackdrop(true)
        let logradouro;
        reverseGeocode(data.location[0], data.location[1])
            .then(res => {
                logradouro = res
                const object = {
                    title: data.title,
                    description: data.description,
                    eventDate: `${moment(data.date.toString()).format('YYYY-MM-DD')}T${moment(data.time.toString()).format("HH:mm:ss")}Z`,
                    isPublic: data.isPublic,
                    hasLimit: data.hasLimit,
                    limitCount: data.limitCount,
                    geocode: data.location,
                    address: logradouro
                }
                console.log(object)
                postEvents(object)
                    .then(res => {
                        handleBackdrop(false)
                        addFedback({
                            description: `Evento criado com sucesso`,
                            typeMessage: 'success'
                        })
                        handleClose()
                        window.location.reload()
                        reset()
                    })
                    .catch(err => {
                        handleBackdrop(false)
                        addFedback({
                            description: `${err.data.message}`,
                            typeMessage: 'error'
                        })
                    })
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <>
            <Box >
                <Grid>
                    <Tooltip
                        title="Criar Evento"
                        placement="top"
                        arrow
                        TransitionComponent={Fade}
                        TransitionProps={{ timeout: 400 }}
                    >
                        <IconButton
                            aria-label="join"
                            size="large"
                            onClick={handleOpen}
                            className={classes.btnAdd}
                        >
                            <LibraryAddIcon fontSize="large" />
                        </IconButton>
                    </Tooltip>
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
                                                onChange={onChange}
                                                error={!!errors.title}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                            />
                                        )}
                                        name="title"
                                    />
                                    <FormHelperText className={classes.helperText}>
                                        {errors.title ? errors.title?.message + '' : ''}
                                    </FormHelperText>
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
                                                onChange={(e) => onChange(e.target.checked)}
                                                checked={value || false}
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
                                                defaultValue={2}
                                                disabled={!watch('hasLimit')}
                                                label="Limite"
                                                variant="outlined"
                                                type="number"
                                                onChange={onChange}
                                                InputProps={{
                                                    inputProps: {
                                                        min: 2
                                                    }
                                                }}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
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
                                                onChange={onChange}
                                                error={!!errors.description}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                            />
                                        )}
                                        name="description"
                                    />
                                    <FormHelperText className={classes.helperText}>
                                        {errors.description ? errors.description?.message + '' : ''}
                                    </FormHelperText>
                                </Grid>
                                <Grid item md={6} sm={12} className={classes.boxInputsStyle}>
                                    <Controller
                                        control={control}
                                        name="date"
                                        rules={{
                                            required: true,
                                        }}
                                        render={({ field: { onChange, onBlur, value } }) => (
                                            <LocalizationProvider dateAdapter={AdapterMoment}>
                                                <DatePicker
                                                    className={classes.datePickerStyle}
                                                    onChange={onChange}
                                                    slotProps={{
                                                        textField: {
                                                            error: !!errors.date,
                                                        },
                                                    }}
                                                />
                                            </LocalizationProvider>
                                        )}
                                    />
                                    <FormHelperText className={classes.helperText}>
                                        {errors.date ? errors.date?.message + '' : ''}
                                    </FormHelperText>
                                </Grid>
                                <Grid item md={6} sm={12} className={classes.boxInputsStyle}

                                >
                                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', }}>
                                        <Controller
                                            control={control}
                                            name="time"
                                            rules={{
                                                required: true,
                                            }}
                                            render={({ field: { onChange, onBlur, value } }) => (
                                                <LocalizationProvider dateAdapter={AdapterMoment}>
                                                    <TimePicker
                                                        onChange={onChange}
                                                        className={classes.timePickerStyle}
                                                        slotProps={{
                                                            textField: {
                                                                error: !!errors.time,
                                                            },
                                                        }}
                                                    />
                                                </LocalizationProvider>
                                            )}
                                        />
                                    </Box>
                                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', }}>
                                        <FormHelperText className={classes.helperText}>
                                            {errors.time ? errors.time?.message + '' : ''}
                                        </FormHelperText>
                                    </Box>

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
                                <Controller
                                    name="location"
                                    control={control}
                                    render={({ field: { value } }) => (
                                        <MapContainer
                                            center={[-22.7999744, -45.2001792]}
                                            zoom={13} style={{ height: '400px' }}>
                                            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                                            <LocationMarker control={control} />
                                        </MapContainer>
                                    )}
                                />
                                <FormHelperText className={classes.helperText}>
                                    {errors.location ? errors.location?.message + '' : ''}
                                </FormHelperText>
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
                                            onChange={(e) => onChange(e.target.checked)}
                                            checked={value || false}
                                            {...label}
                                        />
                                    )}
                                    name="isPublic"
                                />
                                <InputLabel
                                    className={classes.labelCheck}
                                    disabled={!watch('isPublic')}
                                >
                                    Evento Público
                                </InputLabel>
                            </Grid>
                            <Grid className={classes.gridBtns}>
                                <Button variant="outlined" onClick={handleClose} className={classes.btnCancel}>Cancelar</Button>
                                <Button type="submit" className={classes.btnSubmit}>Criar Evento</Button>
                            </Grid>
                        </form>
                    </Box>
                </Modal>
            </Box>
        </>
    )
}

export default ModalCreateEvent