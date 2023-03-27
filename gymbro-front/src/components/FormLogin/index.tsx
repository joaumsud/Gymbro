import Link from '@mui/material/Link';
import { Caixa, Form } from './styles';
import { useHistory } from 'react-router-dom';
import { InputsLoginDTO } from '../../models/Login';
import { FieldErrors, SubmitHandler, UseFormHandleSubmit, UseFormRegister } from 'react-hook-form';

export interface FormLoginDTO {
    register: UseFormRegister<InputsLoginDTO>;
    handleSubmit: UseFormHandleSubmit<InputsLoginDTO>;
    errors: FieldErrors<InputsLoginDTO>;
    onSubmit: SubmitHandler<InputsLoginDTO>;
    handleOpen: () => void;
}

const FormLogin = ({ register, handleSubmit, errors, onSubmit, handleOpen }: FormLoginDTO) => {
    const history = useHistory()

    return (
        <>
            <Caixa>
                <Form onSubmit={handleSubmit(onSubmit)} >
                    <input placeholder="E-mail" {...register("email", { required: true })} style={{
                        display: "block",
                        width: "250px",
                        height: "40px",
                        padding: "6px 6px",
                        marginBottom: "15px",
                        borderRadius: "10px",
                        border: "0.25px solid rgba(54, 56, 46, 0.25)",
                        boxShadow: "10px 5px 5px rgba(54, 56, 46, 0.25)"
                    }} />
                    {errors.email && <span>Este campo é obrigatório</span>}

                    <input placeholder="Senha" type="password" {...register("password", { required: true, minLength: 8 })} style={{
                        display: "block",
                        width: "250px",
                        height: "40px",
                        padding: "6px 6px",
                        marginBottom: "15px",
                        borderRadius: "10px",
                        border: "0.25px solid rgba(54, 56, 46, 0.25)",
                        boxShadow: "10px 5px 5px rgba(54, 56, 46, 0.25)",
                        
                    }} />
                    {errors.password && errors.password.type === 'required' && <span>Este campo é obrigatório.</span>}
                    {errors.password && errors.password.type === 'minLength' && <span>A senha deve conter no mínimo<br></br>oito caracteres.</span>}

                    <button type="submit" style={{
                        borderRadius: "10px",
                        backgroundColor: "#FFB250",
                        border: "none",
                        display: "block",
                        margin: "20px auto",
                        textAlign: "center",
                        width: "150px",
                        height: "50px",
                        color: "white",
                    }}>
                        Login
                    </button>

                    <Link style={{
                        display: "block",
                        textAlign: "center",
                        color: "white",
                        cursor: "pointer"
                    }}
                        onClick={handleOpen}>
                        Cadastrar
                    </Link>
                    <Link style={{
                        display: "block",
                        textAlign: "center",
                        color: "white",
                        cursor: "pointer"
                    }}>
                        Esqueci a senha
                    </Link>
                </Form>
            </Caixa>
        </>
    );
}

export default FormLogin;