import { Link } from "@mui/material";

const LinksFormLogin: React.FC = () => {

    return (
        <>
            <Link
                sx={{
                    fontSize: '18px',
                    color: '#07142B',
                    marginBottom: '18px',
                    cursor: 'pointer'
                }}
            >
                Esqueceu sua Senha?
            </Link>

            <p
                style={{
                    color: 'rgba(7, 20, 43,0.75)',
                    fontSize: '18px',
                    marginBottom: '18px',
                }}
            >
                Não tem uma conta?{' '}
                <Link
                    sx={{
                        color: '#07142B',
                        cursor: 'pointer'
                    }}
                >
                    Cadastre-se
                </Link>
            </p>

            <Link
                sx={{
                    fontSize: '18px',
                    color: '#07142B',
                    cursor: 'pointer'
                }}
            >
                Confirme seu e-mail aqui!
            </Link>
        </>
    );
}

export default LinksFormLogin;