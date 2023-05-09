import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";
import { useState } from "react";
import { forgotPassword } from "../../services/auth.service";
import styles from './ForgotPassword.module.scss';
import { useBackdrop } from '../../hooks/backdrop';

interface ModalProps {
    open: boolean;
    onClose: () => void;
};

interface PageProps {
    onNext?: () => void;
    onBack?: () => void;
}

const FirstPage: React.FC<PageProps> = ({ onNext }) => {
    const [emailForgotPass, setEmailForgotPass] = useState<string>()
    const [btnNext, setBtnNext] = useState(false)
    const { handleBackdrop } = useBackdrop()

    const handleSubmitEmail = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        handleBackdrop(true)
        if (emailForgotPass) {
            forgotPassword(emailForgotPass)
                .then(res => {
                    console.log(res)
                    handleBackdrop(false)
                    setBtnNext(true)
                })
                .catch(err => {
                    console.log(err)
                    handleBackdrop(false)
                    setBtnNext(false)
                })
        }

    }

    return (
        <>
            <DialogTitle>Recuperação de Senha</DialogTitle>
            <DialogContent>
                <Typography sx={{ mb: 3 }}>Digite seu e-mail para receber o token de verificação</Typography>
                <form onSubmit={handleSubmitEmail} className={styles.formForgotPass}>
                    <input

                        value={emailForgotPass}
                        id="emailForgotPass"
                        type="email"
                        onChange={(e) => {
                            setEmailForgotPass(e.target.value)
                        }}
                        placeholder="E-mail"
                    />
                    <Button type="submit" sx={{ backgroundColor: '#6A19E3', color: 'white', '&:hover': { backgroundColor: '#C90FFA' } }}>Receber Token</Button>
                </form>
            </DialogContent>
            <DialogActions>
                <Button variant="contained" sx={{ backgroundColor: '#F00E3D', color: 'white', '&:hover': { backgroundColor: '#F00E3D' } }} onClick={onNext} disabled={!btnNext} className={btnNext ? styles.btnNext : undefined}>Próximo</Button>

            </DialogActions>
        </>
    )
}

const SecondPage: React.FC<PageProps> = ({ onNext, onBack }) => {
    const [token, setToken] = useState<string>()
    const [btnNext, setBtnNext] = useState(false)
    const { handleBackdrop } = useBackdrop()

    const handleSubmitEmail = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        handleBackdrop(true)
    }
    return (
        <>
            <DialogTitle>Recuperação de Senha</DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmitEmail} className={styles.formForgotPass}>
                    <input
                        value={token}
                        id="token"
                        type="text"
                        onChange={(e) => {

                        }}
                        placeholder="Token"
                    />
                    <Button type="submit" sx={{ backgroundColor: '#6A19E3', color: 'white', '&:hover': { backgroundColor: '#C90FFA' } }}>Atualizar senha</Button>
                </form>
            </DialogContent>
            <DialogActions>
                <Button variant="outlined" sx={{ borderColor: '#F00E3D', color: '#F00E3D', '&:hover': { borderColor: '#F00E3D' } }} onClick={onBack}>Voltar</Button>
            </DialogActions>
        </>
    )
}

const Modal: React.FC<ModalProps> = ({ open, onClose }) => {
    const [page, setPage] = useState(1)

    const handleNext = () => {
        setPage(page + 1)
    }

    const handleBack = () => {
        setPage(page - 1)
    }

    return (
        <>
            <Dialog open={open} onClose={onClose}>
                {page === 1 && <FirstPage onNext={handleNext} />}
                {page === 2 && <SecondPage onNext={handleNext} onBack={handleBack} />}
                {/* <Button onClick={onClose}>Fechar</Button> */}
            </Dialog>
        </>
    )
}

export default Modal