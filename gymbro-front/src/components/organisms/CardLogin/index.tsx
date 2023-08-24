
import { Box } from '@mui/system';
import { useState } from 'react'
import Modal from '../../ForgotPassword';
import ConfirmEmail from '../../ConfirmEmail';
import { useStyles } from './styles';
import LinksFormLogin from '../../molecules/LinksFormLogin';
import FormLogin from '../../molecules/FormLogin';

const CardFormLogin = () => {
    const [open, setOpen] = useState(false)
    const [openConfirmEmail, setOpenConfirmEmail] = useState<boolean>(false)

    const classes = useStyles()

    const handleClose = () => {
        setOpen(false)
    }

    const handleCloseConfirmEmail = () => {
        setOpenConfirmEmail(false)
    }

    return (
        <Box className={classes.card}>
            <p className={classes.titleLogin}>Login</p>
            <Box sx={{ marginBottom: '55px' }}>
                <FormLogin />
            </Box>
            <LinksFormLogin />
            <Modal open={open} onClose={handleClose} />
            <ConfirmEmail openModalToken={openConfirmEmail} handleCloseModalToken={handleCloseConfirmEmail} />
        </Box>
    );
}

export default CardFormLogin;