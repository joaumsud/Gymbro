import {
    Box,
    Button,
    Modal,
    Alert,
} from "@mui/material";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { postRegister } from '../../services/register.service'
import styles from './SignUp.module.scss'
import { useState } from "react";
import { useBackdrop } from "../../hooks/backdrop";

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
    const { register, handleSubmit, formState: { errors }, watch, getValues } = useForm();
    const [alertOpen, setAlertOpen] = useState(false)
    const [alertType, setAlertType] = useState('')
    const [alertMessage, setAlertMessage] = useState('')
    const [openModalDetails, setOpenModalDetails] = useState<boolean>(false)
    const { handleBackdrop } = useBackdrop()

    const onSubmit: SubmitHandler<FieldValues> = ({ email, password, firstName, lastName }) => {
        handleBackdrop(true)
        postRegister({
            email: email,
            password: password,
            firstName: firstName,
            lastName: lastName
        })
            .then(res => {
                handleBackdrop(false)

                setAlertOpen(true)
                setAlertType('success')
                setAlertMessage('Usuário adicionado com sucesso!')

                const interval = setInterval(() => {
                    setAlertOpen(false)
                    clearInterval(interval)
                }, 10000)
            })
            .catch(error => {
                handleBackdrop(false)
                setAlertOpen(true)
                setAlertType('error')
                setAlertMessage(error.response.data.message)

                const interval = setInterval(() => {
                    setAlertOpen(false)
                    clearInterval(interval)
                }, 10000)
            })
    };

    const handleOpenModalDetails = () => {
        setOpenModalDetails(true)
    }

    const handleCloseModalDetails = () => {
        setOpenModalDetails(false)
    }

    return (
        <>
            <Modal
                open={openModalDetails}
                onClose={handleCloseModalDetails}
            >
                <Box>

                </Box>
            </Modal>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className={styles.cardSignUp}>
                    {alertOpen && (
                        <Alert severity={alertType === 'success' ? "success" : 'error'} style={{
                            position: 'absolute',
                            top: '10px',
                        }}>
                            {alertMessage}
                        </Alert>
                    )}
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {errors.email && <span style={{ marginBottom: '5px', color: '#F00E3D' }}>Campo email é obrigatório.</span>}
                        <input
                            placeholder="Email"
                            {...register("email", { required: true })} />

                        {errors.password && errors.password.type === 'required'
                            && <span style={{ marginBottom: '5px', color: '#F00E3D' }}>Campo senha é obrigatório.</span>}
                        {errors.password && errors.password.type === 'minLength'
                            && <span style={{ marginBottom: '5px', color: '#F00E3D' }}>A senha deve conter no mínimo 8 caracteres</span>}
                        <input
                            placeholder="Senha"
                            type="password"
                            autoComplete="current-password"
                            {...register("password", { required: true, minLength: 8 })} />


                        {errors.repetPassword && errors.repetPassword.type === 'required'
                            && <span style={{ marginBottom: '5px', color: '#F00E3D' }}>Campo repita a senha é obrigatório.</span>}
                        {errors.repetPassword && errors.repetPassword.type === 'minLength'
                            && <span style={{ marginBottom: '5px', color: '#F00E3D' }}>A senha deve conter no mínimo 8 caracteres</span>}
                        {watch("repetPassword") !== watch("password") &&
                            getValues("repetPassword") ? (
                            <span style={{ marginBottom: '5px', color: '#F00E3D' }}>As senhas são diferentes</span>
                        ) : null}
                        <input
                            placeholder="Repita a Senha"
                            type="password"
                            autoComplete="current-password"
                            {...register("repetPassword", { required: true, minLength: 8 })} />


                        {errors.firstName && <span style={{ marginBottom: '5px', color: '#F00E3D' }}>Campo nome é obrigatório.</span>}
                        <input
                            placeholder="Nome"
                            {...register("firstName", { required: true })} />

                        {errors.lastName && <span style={{ marginBottom: '5px', color: '#F00E3D' }}>Campo sobrenome é obrigatório.</span>}
                        <input
                            placeholder="Sobrenome"
                            {...register("lastName", { required: true })} />


                        <Button className={styles.btnSignUp} type='submit' variant='contained'>
                            Cadastrar
                        </Button>
                    </form>
                </Box>
            </Modal>
        </>
    )
}

export default SignUpForm;