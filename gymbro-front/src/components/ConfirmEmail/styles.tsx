import { makeStyles } from '@mui/styles'
import theme from '../../theme'

const useStyles = makeStyles({
    modalToken: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '400px',
        border: '1px solid rgba(255, 255, 255, 0.9)',
        borderRadius: '5px',
        boxShadow: '24',
        padding: '50px 20px',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
    },
    modalDetails: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '400px',
        border: '1px solid rgba(255, 255, 255, 0.9)',
        borderRadius: '5px',
        boxShadow: '24',
        padding: '80px 20px',
        display: 'flex',
        justifyContent:'center',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
    },
    inputToken: {
        width: '100%',
        margin: '20px 0px',
        fontSize: '0.9rem',
        background: 'transparent',
        transition: 'border-color 0.2s',
    },
    btnSubmit: {
        width: '150px !important',
        padding: '10px 20px !important',
        fontSize: '15px !important',
        backgroundColor: '#110FFA !important',
        color: 'white !important',
        alignSelf: 'flex-end',
        transition: 'all .2s ease-in-out !important',
        '&:hover': {
            transform: 'scale(1.02)',
            boxShadow: "0 6px 12px 0 #110FFA"
        },
        '&:disabled': {
            backgroundColor: '#d3d3d3 !important',
        }
    }
})

export default useStyles