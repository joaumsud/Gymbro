import { useState } from "react";
import FormLogin from "../../components/FormLogin";
import SignUpForm from "../../components/FormSignUp";
import { Box } from "@mui/material";
import "./style.css";

const LoginPage = () => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>
            <Box className='styleBoxLoginAndRegister'>
                <FormLogin
                    handleOpen={handleOpen}
                />
                <SignUpForm
                    open={open}
                    handleClose={handleClose}
                />
            </Box>
        </>
    );
}

export default LoginPage;