import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles(() => ({
    btnDialogDelete: {
        width: '130px !important',
        padding: '5px 15px !important',
        fontSize: '12px !important',
        backgroundColor: '#F00E3D !important',
        color: 'white !important',
        marginLeft: '1.0rem !important',
        marginTop: '1.1rem !important',
        '&:hover': {
            backgroundColor: '#F00E3D !important'
        }
    },
    btnDialogCancel: {
        width: '130px !important',
        padding: '5px 15px !important',
        fontSize: '12px !important',
        // backgroundColor: '#6A19E3 !important',
        borderColor: '#F00E3D !important',
        color: '#F00E3D !important',
        // marginLeft: '1.5rem !important',
        marginTop: '1.1rem !important',
        '&:hover': {
            // backgroundColor: '#6A19E3 !important'
        }
    },
}));