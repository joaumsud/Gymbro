import Link from '@mui/material/Link';
import { Caixa, Form, Input } from './styles';
import { useHistory } from 'react-router-dom';
import { InputsLoginDTO } from '../../models/Login';
import { SubmitHandler, useForm, } from 'react-hook-form';
import { Button } from '@mui/material';
import { loginPost } from '../../services/auth.service';

export interface FormLoginDTO {
    handleOpen: () => void;
}

const FormLogin = ({ handleOpen }: FormLoginDTO) => {
    const history = useHistory()

    const { register, handleSubmit, formState: { errors } } = useForm<InputsLoginDTO>();

    const onSubmit: SubmitHandler<InputsLoginDTO> = async ({ email, password }) => {
        const authState = await loginPost({ email: email, password: password })
        if (authState) {
            history.push('/')
        }
    };
    return (
        <>
            <Caixa>
                <Form onSubmit={handleSubmit(onSubmit)} >
                    <Input placeholder="E-mail" {...register("email", { required: true })} />
                    {errors.email && <span>Este campo é obrigatório</span>}

                    <Input placeholder="Senha" type="password" {...register("password", { required: true, minLength: 8 })} />
                    {errors.password && errors.password.type === 'required' && <span>Este campo é obrigatório.</span>}
                    {errors.password && errors.password.type === 'minLength' && <span>A senha deve conter no mínimo<br></br>oito caracteres.</span>}

                    <Button type="submit" style={{
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
                    </Button>

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