import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { useState } from "react";

interface ModalProps {
    open: boolean;
    onClose: () => void;
};

interface PageProps {
    onNext?: () => void;
    onBack?: () => void;
}

const FirstPage: React.FC<PageProps> = ({ onNext }) => {

    const handleSubmitEmail = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log("ok")
    }

    return (
        <>
            <DialogTitle>Primeira Página</DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmitEmail}>
                    <input id="emailForgotPass" type="text" />
                    <Button type="submit">Receber Token</Button>
                </form>
            </DialogContent>
            <DialogActions>
                <Button onClick={onNext}>Próximo</Button>
            </DialogActions>
        </>
    )
}

const SecondPage: React.FC<PageProps> = ({ onNext, onBack }) => {
    return (
        <>
            <DialogTitle>Segunda Página</DialogTitle>
            <DialogContent>
                <p>Conteúdo 2</p>
            </DialogContent>
            <DialogActions>
                <Button onClick={onBack}>Voltar</Button>
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