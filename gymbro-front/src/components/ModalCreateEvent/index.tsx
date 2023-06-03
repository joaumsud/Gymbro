import { Button, Modal, Box, Typography, Grid, TextField, Checkbox, Divider, InputLabel, Alert, FormHelperText } from "@mui/material";
import { yupResolver } from '@hookform/resolvers/yup';
import React, { forwardRef, useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import useStyles from "./styles";
// import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import { postEvents } from "../../services/events.service";
import { CreateEventDTO } from "../../models/Events";
import Backdrop from '@mui/material/Backdrop';
import ptBR from 'date-fns/locale/pt-BR'
import moment from "moment";
import { BaseTextFieldProps } from '@mui/material';
import { DatePicker, LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DesktopDatePickerProps } from '@mui/x-date-pickers/DesktopDatePicker';
import { Moment } from 'moment';
import { validationSchema } from "./ValidationSchema";



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

    const { handleSubmit, control, watch, setValue, reset, formState: { errors } } = useForm<any>({
        resolver: yupResolver(validationSchema)
    });

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

    // const LocationMarker = () => {
    //     useMapEvents({
    //         click: handleMapClick,
    //     });

    //     if (markerLocation) {
    //         return <Marker position={markerLocation} />;
    //     }

    //     return null;
    // };
    const LocationMarker = ({ control }: any) => {
        // const { setValue } = useForm({ control });
        const [markerLocation, setMarkerLocation] = useState(null);

        const handleMapClick = (e: any) => {
            const { lat, lng } = e.latlng;
            const location: any = [lat, lng];
            setMarkerLocation(location);
            setValue('location', location); // Atualize o valor do campo 'location' com a localização selecionada
        };

        useMapEvents({
            click: handleMapClick,
        });

        if (markerLocation) {
            return <Marker position={markerLocation} />;
        }

        return null;
    };


    const onSubmit = (data: any) => {
        const object = {
            title: title,
            description: description,
            // eventDate: startDate.toString(),
            // eventDate: `${moment(startDate.toString()).format('YYYY-MM-DD')}T${moment(startDate.toString()).format("HH:mm:ss")}Z`,
            eventDate: data.date,
            isPublic: isPublic,
            hasLimit: hasLimit,
            limitCount: limitCount,
            geocode: markerLocation!,
        }
        console.log(data)
        // postEvents(object)
        //     .then(res => {

        //     })
        //     .catch(err => {

        //     })
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
                                                sx={{ ml: 2 }}
                                                disabled={!watch('hasLimit')}
                                                label="Limite"
                                                variant="outlined"
                                                type="number"
                                                // value={limitCount}
                                                onChange={onChange}
                                                InputProps={{
                                                    inputProps: {
                                                        min: 1
                                                    }
                                                }}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                error={!!errors.limitCount}
                                            />
                                        )}
                                        name="limitCount"
                                    />
                                    {/* <FormHelperText className={classes.helperText}>
                                        {errors.limitCount ? errors.limitCount?.message + '' : ''}
                                    </FormHelperText> */}
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
                                                // value={description}
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
                                                />
                                            </LocalizationProvider>
                                        )}
                                    />
                                    <FormHelperText className={classes.helperText}>
                                        {errors.date ? errors.date?.message + '' : ''}
                                    </FormHelperText>
                                </Grid>
                                <Grid item md={6} sm={12} className={classes.boxInputsStyle} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
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
                                                    className={classes.timePickerStyle} />
                                            </LocalizationProvider>
                                        )}
                                    />
                                    <FormHelperText className={classes.helperText}>
                                        {errors.time ? errors.time?.message + '' : ''}
                                    </FormHelperText>
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
                                {/* <Controller
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
                                    /> */}
                                {/* <MapContainer center={[-22.7999744, -45.2001792]} zoom={13} style={{ height: '400px' }}>
                                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                                    <LocationMarker control={control} />
                                </MapContainer> */}
                                <Controller
                                    name="location"
                                    control={control}
                                    defaultValue={[-22.7999744, -45.2001792]}
                                    render={({ field: { value } }) => (
                                        <MapContainer center={value} zoom={13} style={{ height: '400px' }}>
                                            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                                            <LocationMarker control={control} />
                                        </MapContainer>
                                    )}
                                />
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
                                <Button type="submit" className={classes.btnAdd}>Criar Evento</Button>
                            </Grid>
                        </form>
                    </Box>
                </Modal>
            </Box>
        </>
    )
}

export default ModalCreateEvent