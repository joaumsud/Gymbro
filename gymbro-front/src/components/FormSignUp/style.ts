import { createTheme } from "@mui/material";

export const styleBox = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    border: "0.25px solid rgba(54, 56, 46, 0.25)",
    width: '30vw',
    height: '60vh',
    borderRadius: '10px',
};

export const styleBtnRegister = {
    borderRadius: "10px",
    backgroundColor: "#F06449",
    border: "none",
    display: "block",
    margin: "20px auto",
    textAlign: "center",
    width: "150px",
    height: "50px",
    color: "white",
}

export const styleInputsRegister = {
    display: "block",
    width: "250px",
    height: "40px",
    padding: "6px 6px",
    margin: "14px 0px",
    marginBottom: "15px",
    borderRadius: "10px",
    border: "0.25px solid rgba(54, 56, 46, 0.25)",
    boxShadow: "10px 5px 5px rgba(54, 56, 46, 0.25)"
}

export const styleFormControl = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    marginTop: "1.2rem"
}

export const theme = createTheme({
    palette: {
        secondary: {
            main: '#F06449',
        },
    },
});