import { useState } from "react"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { useHistory } from "react-router"
import { useUserAuth } from "../../../hooks/userProvider"
import { useBackdrop } from "../../../hooks/backdrop"
import { useStyles } from "./styles"
import { InputsLoginDTO } from "../../../models/Login"
import { loginPost } from "../../../services/auth.service"
import Cookies from "js-cookie"
import { Button } from "@mui/material"
import CustomInput from "../../atoms/TextField"
import TextError from "../../atoms/TextError"


const FormLogin = () => {
    const [openError, setOpenError] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<string>('')

    const { control, handleSubmit, formState: { errors } } = useForm<InputsLoginDTO>();

    const history = useHistory()
    const classes = useStyles()

    const { addUserAuth } = useUserAuth()
    const { handleBackdrop } = useBackdrop()

    const handleOpenError = () => {
        setOpenError(true)
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
                Cookies.set('acessToken', acessToken, { secure: true, sameSite: 'strict' });
                Cookies.set('refreshToken', refreshToken, { secure: true, sameSite: 'strict' })
                history.push('/dash')
            })
            .catch((error) => {
                handleOpenError()
                setErrorMessage(error.message)
                handleBackdrop(false)
            })
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Controller
                    control={control}
                    rules={{
                        required: 'Campo obrigatório',
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <CustomInput
                            onChange={onChange}
                            placeholder='E-mail'
                            error={errors.email}
                            type='email'
                            width='400px'
                            fontSize='18px'
                        />
                    )}
                    name='email'
                />
                <Controller
                    control={control}
                    rules={{
                        required: 'Campo obrigatório',
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <CustomInput
                            onChange={onChange}
                            placeholder='Senha'
                            error={errors.password}
                            type='password'
                            width='400px'
                            fontSize='18px'
                        />
                    )}
                    name='password'
                />
                {
                    openError ? (
                        <TextError
                            message={errorMessage}
                        />
                    ) : (null)
                }
                <Button
                    type='submit'
                    className={classes.btnLogin}
                    sx={
                        openError ?
                            { textTransform: 'none', fontWeight: 400, marginTop: '15px' } :
                            { textTransform: 'none', fontWeight: 400, marginTop: '35px' }
                    }
                >
                    Entrar
                </Button>
            </form>
        </>
    );
}

export default FormLogin;