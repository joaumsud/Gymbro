import {
    Modal,
    Box,
    Typography,
    Divider,
    Button,
    Alert
} from "@mui/material"
import useStyles from "./styles";
import { User, confirmEmail } from "../../services/register.service";
import { useState } from "react";
import { useBackdrop } from "../../hooks/backdrop";
import { useFeedback } from "../../hooks/addFeedback";
import SportsGymnasticsIcon from '@mui/icons-material/SportsGymnastics';

export interface ConfirmEmailProps {
    openModalToken: boolean;
    handleCloseModalToken: () => void;
    user?: User;
}

const ConfirmEmail: React.FC<ConfirmEmailProps> = ({ openModalToken, handleCloseModalToken, user }) => {
    const classes = useStyles()
    const [token, setToken] = useState<string>('')
    const [openModalDetails, setOpenModalDetails] = useState<boolean>(false)
    const { handleBackdrop } = useBackdrop()
    const { addFedback } = useFeedback()

    const handleOpenModalDetails = () => {
        setOpenModalDetails(true)
    }

    const handleCloseModalDetails = () => {
        setOpenModalDetails(false)
    }

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setToken(event.target.value)
    }

    const handleConfirmEmail = () => {
        handleBackdrop(true)
        confirmEmail(token)
            .then(res => {
                handleBackdrop(false)
                handleOpenModalDetails()
                handleCloseModalToken()
                console.log(res)
            })
            .catch(err => {
                handleBackdrop(false)
                addFedback({
                    description: `Token inválido`,
                    typeMessage: 'error'
                })
            })
    }
    return (
        <>
            <Modal
                open={openModalToken}
                onClose={handleCloseModalToken}
            >
                <Box
                    className={classes.modalToken}
                >
                    <Typography textAlign={'left'} variant="h6">
                        Cole aqui o token recebido:
                    </Typography>
                    <Divider />
                    <input
                        type="text"
                        className={classes.inputToken}
                        placeholder="Token"
                        required
                        value={token}
                        onChange={onChange}
                    />
                    <Button
                        className={classes.btnSubmit}
                        onClick={handleConfirmEmail}
                        disabled={
                            token.length > 0 ? false : true
                        }>
                        Confirmar
                    </Button>
                </Box>
            </Modal>
            <Modal
                open={openModalDetails}
                onClose={handleCloseModalDetails}
            >
                <Box
                    className={classes.modalDetails}
                >

                    <Alert
                        severity={'success'}
                        style={{
                            position: 'absolute',
                            top: '10px',
                        }}>
                        Usuário criado com sucesso
                    </Alert>
                    <Typography>
                        E-mail: {user?.email}
                        <br />
                        <br />
                        Bem-vindo ao GymBroz, <strong>{`${user?.firstName} ${user?.lastName}`}</strong>, entre e se divirta!<SportsGymnasticsIcon />
                    </Typography>
                </Box>
            </Modal>
        </>

    )
}

export default ConfirmEmail