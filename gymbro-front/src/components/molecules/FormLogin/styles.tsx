import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles(() => ({
    btnLogin: {
        backgroundColor: '#53BF9D !important',
        width: '400px !important',
        heigth: '42px !important',
        borderRadius: '0px !important',
        border: '1.8px solid #07142B !important',
        '&:hover': {
            backgroundColor: '#53BF9D !important',
        },
        fontFamily: 'Crimson Text !important',
        fontSize: '28px !important',
        fontStyle: 'normal !important',
        lineHeight: 'normal !important',
        padding: '3px !important',
        color: '#07142B !important'
    }
}));