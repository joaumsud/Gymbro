import { useState } from "react";
import FormLogin from "../../components/FormLogin";
import SignUpForm from "../../components/FormSignUp";

const LoginPage = () => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>
            <div
                style={{ backgroundColor: "rgba(253, 253, 150, 0.8)", display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
                <FormLogin
                    handleOpen={handleOpen}
                />
                <SignUpForm
                    open={open}
                    handleClose={handleClose}
                />
            </div>
        </>
    );
}

export default LoginPage;