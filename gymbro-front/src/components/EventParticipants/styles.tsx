import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles(() => ({
    modalParticipants: {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: '500px',
        backgroundColor: "#fff !important",
        border: "2px solid #000",
        boxShadow: '24',
        padding: '32px',
        maxHeight: '400px',
        overflowY: 'scroll',
    },
    boxParticipants: {
        padding: '0px 10px',
        border: '1px solid rgba(7,20,43,0.3)',
        borderRadius: '5px',
        overflowY: 'scroll',
        maxHeight:'300px',
    },
    containerProfiles: {
        display: 'flex',
        alignItems: 'center',
        padding: '5px',
        marginTop: '10px',
    },
    boxImgs: {
        width: '2.8rem',
        height: '2.8rem',
        borderRadius: '50%',
        m: 1,
        alignSelf: 'center',

    },
    picsProfiles: {
        objectFit: 'cover', width: '100%',
        height: '100%',
        borderRadius: '50%'
    },
    divStyle: {
        margin: '15px 0px'
    }
}));