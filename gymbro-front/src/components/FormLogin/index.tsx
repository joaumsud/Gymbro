import styles from './LoginCard.module.scss';
import {  useHistory } from 'react-router-dom';
import { InputsLoginDTO } from '../../models/Login';
import { SubmitHandler, useForm, } from 'react-hook-form';
import { Button } from '@mui/material';
import { loginPost } from '../../services/auth.service';
import { Box } from '@mui/system';

const FormLogin = () => {
    const history = useHistory()
    const { register, handleSubmit, formState: { errors } } = useForm<InputsLoginDTO>();

    const onSubmit: SubmitHandler<InputsLoginDTO> = async ({ email, password }) => {
        const authState = await loginPost({ email: email, password: password })

        if (authState) {
            history.push('/dash')
            window.location.reload()
        }

    };
    return (
        <>
            <Box className={styles.card}>
                <form onSubmit={handleSubmit(onSubmit)} >
                    <input placeholder="E-mail" {...register("email", { required: true })} />
                    {errors.email && <span>Este campo é obrigatório</span>}

                    <input placeholder="Senha" type="password" {...register("password", { required: true, minLength: 8 })} />
                    {errors.password && errors.password.type === 'required' && <span>Este campo é obrigatório.</span>}
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