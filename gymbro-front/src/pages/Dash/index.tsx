import { logout } from "../../services/auth.service";

const Dash = () => {
    return (
        <>
            <h1>Bem-Vindo ao GymBro</h1>
            <button onClick={()=>{
                logout()
            }}>
                Sair
            </button>
        </>
    );
}

export default Dash;