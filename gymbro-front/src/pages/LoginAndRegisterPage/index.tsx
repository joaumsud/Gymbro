import React, { useState } from "react";
import Cookies from "js-cookie";
import { useForm, SubmitHandler } from "react-hook-form";
import { InputsLoginDTO } from "../../models/Login";
import FormLogin from "../../components/FormLogin";
import { loginPost } from '../../services/auth.service';
import { useHistory, Redirect } from 'react-router-dom'
import SignUpForm from "../../components/FormSignUp";

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory()
    const { register, handleSubmit, watch, formState: { errors } } = useForm<InputsLoginDTO>();

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const onSubmit: SubmitHandler<InputsLoginDTO> = async (data) => {
        setEmail(watch("email"))
        setPassword(watch("password"))
        const authState = await loginPost({ email: email, password: password })
        if (authState) {
            history.push('/')
        }
    };

    return (
        <>
        <div
        style={{backgroundColor: "rgba(253, 253, 150, 0.8)", display: "flex", justifyContent: "center", alignItems: "center", height:"100vh"}}> 
            <FormLogin
                register={register}
                handleSubmit={handleSubmit}
                errors={errors}
                onSubmit={onSubmit}
                handleOpen={handleOpen}
            />
            <SignUpForm
                open={open}
                handleClose={handleClose}
            />
            </div>
        </>
    );
}

export default LoginPage;