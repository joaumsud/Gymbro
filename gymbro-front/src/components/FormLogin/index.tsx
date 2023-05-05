import styles from './LoginCard.module.scss';
import { useHistory } from 'react-router-dom';
import { InputsLoginDTO } from '../../models/Login';
import { SubmitHandler, useForm, } from 'react-hook-form';
import { Alert, Button, Link } from '@mui/material';
import { loginPost } from '../../services/auth.service';
import { Box } from '@mui/system';
import { useState } from 'react'
import Cookies from 'js-cookie';
import { useUserAuth } from '../../hooks/userProvider';
import { useBackdrop } from '../../hooks/backdrop';
import { forgotPassword } from '../../services/auth.service';
import Modal from '../ForgotPassword';

const FormLogin = () => {
    const history = useHistory()
    const { register, handleSubmit, formState: { errors } } = useForm<InputsLoginDTO>();
    const [errorMessage, setErrorMessage] = useState('')
    const [alertOpen, setAlertOpen] = useState(false)
    const [open, setOpen] = useState(false)
    const { addUserAuth } = useUserAuth()
    const { handleBackdrop } = useBackdrop()

    // console.log(forgotPassword('charlemagnexxv@yahoo.com'))


    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const onSubmit: SubmitHandler<InputsLoginDTO> = ({ email, password }) => {
        handleBackdrop(true)
        loginPost({ email: email, password: password })
            .then((res) => {
                handleBackdrop(false)
                const { acessToken, refreshToken, user } = res.data;
                addUserAuth(
                    user.id,
                    user.email,
                    user.firstName,
                    user.lastName,
                    user.profilePictureUrl,
                    user.profilePicturePath,
                    user.isAdmin,
                    user.isActive
                )
                Cookies.set('acessToken', acessToken);
                Cookies.set('refreshToken', refreshToken)
                history.push('/dash')
                window.location.reload()
            })
            .catch((error) => {
                handleBackdrop(false)
                console.log(error)
                error.response.data.message
                    ? setErrorMessage(error.response.data.message)
                    : setErrorMessage('Credenciais Inválidas!')

                setAlertOpen(true)
                const interval = setInterval(() => {
                    setAlertOpen(false)
                    clearInterval(interval)
                }, 10000)
            })
    };
    // const onSubmit: SubmitHandler<InputsLoginDTO> = async ({ email, password }) => {
    //     const authState = await loginPost({ email: email, password: password })
    //     if (authState) {
    //         history.push('/dash')
    //         window.location.reload()
    //     }
    // };
    return (
        <>
            <Box className={styles.card}>
                <form onSubmit={handleSubmit(onSubmit)} >

                    {alertOpen && (
                        <Alert severity='error' style={{
                            marginBottom: '20px'
                        }}>
                            {errorMessage}
                        </Alert>
                    )}

                    <input placeholder="E-mail" {...register("email", { required: true })} />
                    {errors.email && <span style={{ marginBottom: '5px' }}>Campo e-mail é obrigatório</span>}

                    <input placeholder="Senha" type="password" {...register("password", { required: true, minLength: 8 })} />
                    {errors.password && errors.password.type === 'required' && <span>Campo senha é obrigatório.</span>}
                    {errors.password && errors.password.type === 'minLength' && <span>A senha deve conter no mínimo<br></br>oito caracteres.</span>}

                    <Button type="submit" className={styles.btnLogin}>
                        Login
                    </Button>
                </form>
                <Link onClick={handleOpen}
                >
                    Esqueci a senha
                </Link>
                <Modal open={open} onClose={handleClose} />
            </Box>
        </>
    );
}

export default FormLogin;