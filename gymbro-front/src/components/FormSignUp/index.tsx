import {
    Box,
    Button,
    Modal,
    ThemeProvider,
    Alert,
    Stack
} from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { styleBox, styleBtnRegister, theme, styleInputsRegister, styleFormControl } from "./style";
import { postRegister } from '../../services/register.service'
import { useState } from "react";

export interface RegisterDTO {
    handleClose: () => void;
    open: boolean;
    onSubmitRegister?: () => void
}

export interface InputsDTO {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}

const SignUpForm = ({ handleClose, open }: RegisterDTO) => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [alertOpen, setAlertOpen] = useState(false)
    const [alertType, setAlertType] = useState('')
    const [alertMessage, setAlertMessage] = useState('')

    const onSubmit: SubmitHandler<InputsDTO> = ({ email, password, firstName, lastName }) => {
        postRegister({
            email: email,
            password: password,
            firstName: firstName,
            lastName: lastName
        })
            .then(res => {
                console.log(res.data);
                setAlertOpen(true)
                setAlertType('success')
                setAlertMessage('Usuário adicionado com sucesso!')

                const interval = setInterval(() => {
                    setAlertOpen(false)
                    clearInterval(interval)
                }, 10000)
            })
            .catch(error => {
                console.log(error.response.data.message);
                setAlertOpen(true)
                setAlertType('error')
                setAlertMessage(error.response.data.message)

                const interval = setInterval(() => {
                    setAlertOpen(false)
                    clearInterval(interval)
                }, 10000)
            })
    };

    return (
        <>
            <ThemeProvider theme={theme}>
                <Modal 
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={styleBox} style= {{ backgroundImage: 'linear-gradient(to right top, #051937, #5f2d60, #b84160, #ed793e, #e6cb17)'}}>
                        <form style={styleFormControl} onSubmit={handleSubmit(onSubmit)}>
                            <input
                                placeholder="Email"
                                style={styleInputsRegister}
                                {...register("email", { required: true })} />
                            {errors.email && <span>Este campo é obrigatório.</span>}

                            <input
                                placeholder="Password"
                                type="password"
                                autoComplete="current-password"
                                style={styleInputsRegister}
                                {...register("password", { required: true, minLength: 8 })} />
                            {errors.password && errors.password.type === 'required' && <span>Este campo é obrigatório.</span>}
                            {errors.password && errors.password.type === 'minLength' && <span>A senha deve conter no mínimo 8 caracteres</span>}

                            <input
                                placeholder="Nome"
                                style={styleInputsRegister}
                                {...register("firstName", { required: true })} />
                            {errors.firstName && <span>Este campo é obrigatório.</span>}

                            <input
                                placeholder="Sobrenome"
                                style={styleInputsRegister}
                                {...register("lastName", { required: true })} />
                            {errors.lastName && <span>Este campo é obrigatório.</span>}

                            <Button type='submit' sx={styleBtnRegister} variant='contained' color='secondary'>
                                Cadastrar
                            </Button>
                        </form>
                        {alertOpen && (
                            <Alert severity={alertType === 'success' ? "success" : 'error'} style={{marginBottom: 5}}>
                                {alertMessage}
                            </Alert>
                        )}
                    </Box>
                </Modal>
            </ThemeProvider>
        </>
    )
}

export default SignUpForm;