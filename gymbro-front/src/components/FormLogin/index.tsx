import styles from './LoginCard.module.scss';
import { useHistory } from 'react-router-dom';
import { InputsLoginDTO } from '../../models/Login';
import { SubmitHandler, useForm, } from 'react-hook-form';
import { Alert, Button } from '@mui/material';
import { loginPost } from '../../services/auth.service';
import { Box } from '@mui/system';
import { useState } from 'react'
import Cookies from 'js-cookie';
import { useUserAuth } from '../../hooks/userProvider';

const FormLogin = () => {
    const history = useHistory()
    const { register, handleSubmit, formState: { errors } } = useForm<InputsLoginDTO>();
    const [errorMessage, setErrorMessage] = useState('')
    const [alertOpen, setAlertOpen] = useState(false)

    const onSubmit: SubmitHandler<InputsLoginDTO> = ({ email, password }) => {
        loginPost({ email: email, password: password })
            .then((res) => {
                const { acessToken, refreshToken } = res.data;
                Cookies.set('acessToken', acessToken);
                Cookies.set('refreshToken', refreshToken)
                history.push('/dash')
                window.location.reload()
            })
            .catch((error) => {
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
            </Box>
        </>
    );
}

export default FormLogin;