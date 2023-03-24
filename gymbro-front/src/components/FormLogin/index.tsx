import Link from '@mui/material/Link';
import { Caixa, Form } from './styles';

const FormLogin = ({ register, handleSubmit, errors, onSubmit }) => {
    console.log("Errors: ", errors.password)
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
                        boxShadow: "10px 5px 5px rgba(54, 56, 46, 0.25)"
                    }} />
                    {errors.password && errors.password.type === 'required' && <span>Este campo é obrigatório.</span>}
                    {errors.password && errors.password.type === 'minLength' && <span>A senha deve conter no mínimo<br></br>oito caracteres.</span>}

                    <button type="submit" style={{
                        borderRadius: "10px",
                        backgroundColor: "#F06449",
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
                        display: "block"
                    }}>
                        Cadastrar
                    </Link>
                    <Link style={{
                        display: "block"
                    }}>
                        Esqueci a senha
                    </Link>
                </Form>
            </Caixa>
        </>
    );
}

export default FormLogin;