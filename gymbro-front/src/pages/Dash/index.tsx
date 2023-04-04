import { logout } from "../../services/auth.service";
import { useHistory } from "react-router-dom";

const Dash = () => {
    const history = useHistory()
    return (
        <>
            <h1>Bem-Vindo ao GymBro</h1>
            <button onClick={()=>{
                logout()
                history.push('/')
                window.location.reload()
            }}>
                Sair
            </button>
        </>
    );
}

export default Dash;