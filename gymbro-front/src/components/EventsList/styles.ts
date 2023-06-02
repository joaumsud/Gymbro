import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles(() => ({
    card: {
        border: '1px solid',
        borderColor: '#110FFA',
        borderRadius: 12,
        backgroundColor: '#fff',
        '&.MuiCard-root': {
            padding: '10px 0px !important',
        },
    },
    cardAdmin: {
        border: '1px solid',
        borderColor: 'rgba(201,15,250,0.5)',
        borderRadius: 12,
        backgroundColor: '#fff',
        '&.MuiCard-root': {
            padding: '10px 0px !important',
        },
    },
    titleFont: {
        fontFamily: "'Kanit', san-serif",
        color: '#37474f',
    },
    header: {
        margin: 0,
        textAlign: 'center',
        fontSize: '1.25rem',
        letterSpacing: '1px',
    },
    ribbon: {
        textAlign: 'center',
        color: '#F4F2EE',
        letterSpacing: 1,
        width: '100%',
    },
    btnAdd: {
        width: '150px !important',
        padding: '5px 15px !important',
        fontSize: '12px !important',
        backgroundColor: '#6A19E3 !important',
        color: 'white !important',
        marginLeft: '1.5rem !important',
        marginTop: '1.1rem !important',
        '&:hover': {
            backgroundColor: '#6A19E3 !important'
        }
    },
    pagination: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: '1rem',
    },
}));