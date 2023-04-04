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
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [alertOpen, setAlertOpen] = useState(false)
    const [alertType, setAlertType] = useState('')
    const [alertMessage, setAlertMessage] = useState('')

    const onSubmit: SubmitHandler<FieldValues> = ({ email, password, firstName, lastName }) => {
        postRegister({
            email: email,
            password: password,
            firstName: firstName,
            lastName: lastName
        })
            .then(res => {
                setAlertOpen(true)
                setAlertType('success')
                setAlertMessage('Usuário adicionado com sucesso!')

                const interval = setInterval(() => {
                    setAlertOpen(false)
                    clearInterval(interval)
                }, 10000)
            })
            .catch(error => {
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
                <Modal 
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box className={styles.cardSignUp}>
                        <form  onSubmit={handleSubmit(onSubmit)}>
                            <input
                                placeholder="Email"
                                {...register("email", { required: true })} />
                            {errors.email && <span>Este campo é obrigatório.</span>}

                            <input
                                placeholder="Password"
                                type="password"
                                autoComplete="current-password"
                                
                                {...register("password", { required: true, minLength: 8 })} />
                            {errors.password && errors.password.type === 'required' && <span>Este campo é obrigatório.</span>}
                            {errors.password && errors.password.type === 'minLength' && <span>A senha deve conter no mínimo 8 caracteres</span>}

                            <input
                                placeholder="Nome"
                                
                                {...register("firstName", { required: true })} />
                            {errors.firstName && <span>Este campo é obrigatório.</span>}

                            <input
                                placeholder="Sobrenome"
                                
                                {...register("lastName", { required: true })} />
                            {errors.lastName && <span>Este campo é obrigatório.</span>}

                            <Button  className={styles.btnSignUp} type='submit'  variant='contained'>
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
        </>
    )
}

export default SignUpForm;