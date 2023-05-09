import { Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";
import { useState } from "react";
import { forgotPassword, resetPassword } from "../../services/auth.service";
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
    const [alertOpen, setAlertOpen] = useState(false)
    const [alertType, setAlertType] = useState('')
    const [alertMessage, setAlertMessage] = useState('')

    const handleSubmitEmail = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        handleBackdrop(true)
        if (emailForgotPass) {
            forgotPassword(emailForgotPass)
                .then(res => {
                    console.log(res)
                    handleBackdrop(false)
                    setBtnNext(true)

                    setAlertOpen(true)
                    setAlertType('success')
                    setAlertMessage(res.data.message)

                    const interval = setInterval(() => {
                        setAlertOpen(false)
                        clearInterval(interval)
                    }, 10000)
                })
                .catch(err => {
                    console.log(err)
                    handleBackdrop(false)
                    setBtnNext(false)

                    setAlertOpen(true)
                    setAlertType('error')
                    setAlertMessage(err.response.data.message)

                    const interval = setInterval(() => {
                        setAlertOpen(false)
                        clearInterval(interval)
                    }, 10000)
                })
        }
    }

    return (
        <>
            <DialogTitle>Recuperação de Senha</DialogTitle>
            <DialogContent>
                <Typography sx={{ mb: 3 }}>Digite seu e-mail para receber o token de verificação</Typography>
                <form onSubmit={handleSubmitEmail} className={styles.formForgotPass}>

                    {alertOpen && (
                        <Alert severity={alertType === 'success' ? "success" : 'error'} style={{
                            marginBottom: '5px',
                            minWidth: '100px',
                            maxWidth: '400px'
                        }}>
                            {alertMessage}
                        </Alert>
                    )}

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
    const [newPass, setNewPass] = useState<string>()
    const { handleBackdrop } = useBackdrop()
    const [alertOpen, setAlertOpen] = useState(false)
    const [alertType, setAlertType] = useState('')
    const [alertMessage, setAlertMessage] = useState('')

    const handleSubmitEmail = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        handleBackdrop(true)
        resetPassword(e.target.token.value, e.target.pass.value)
            .then(res => {
                handleBackdrop(false)
                setAlertOpen(true)
                setAlertType('success')
                setAlertMessage(res.data.message)

                const interval = setInterval(() => {
                    setAlertOpen(false)
                    clearInterval(interval)
                }, 10000)
            })
            .catch(err => {
                handleBackdrop(false)
                setAlertOpen(true)
                setAlertType('error')
                setAlertMessage('Token Inválido')

                const interval = setInterval(() => {
                    setAlertOpen(false)
                    clearInterval(interval)
                }, 10000)
                console.log(err)
            })
    }
    return (
        <>
            <DialogTitle>Recuperação de Senha</DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmitEmail} className={styles.formForgotPass}>
                    {alertOpen && (
                        <Alert severity={alertType === 'success' ? "success" : 'error'} style={{
                            marginBottom: '10px',
                            minWidth: '100px',
                            maxWidth: '400px'
                        }}>
                            {alertMessage}
                        </Alert>
                    )}
                    <input
                        defaultValue=''
                        value={token}
                        id="token"
                        type="text"
                        onChange={(e) => {
                        }}
                        placeholder="Token"
                    />
                    <input
                        value={newPass}
                        id="pass"
                        type="password"
                        onChange={(e) => {
                        }}
                        placeholder="Nova Senha"
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