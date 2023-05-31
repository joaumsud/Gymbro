import { makeStyles } from '@mui/styles'
import theme from '../../theme'

const useStyles = makeStyles({
    modalStyle: {
        overflowY: 'scroll',
        overflowX:'hidden',
        height: '600px',
        minHeight: '600px',
        width: '750px',
        [theme.breakpoints.down('md')]: {
            width: '450px'
        }
    },
    formStyle: {
        padding: '1.2rem 0'
    },
    boxInputsStyle: {
        margin: '10px 0px 15px !important'
    },
    boxInputsLimitStyle: {
        margin: '10px 0px 15px !important',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        [theme.breakpoints.down('md')]: {
            justifyContent: 'flex-start'
        }
    },
    inputsStyle: {
        width: '90%',
        [theme.breakpoints.down('md')]: {
            width: '100%'
        }
    },
    labelCheck: {
        fontSize: '25px !important',
        marginLeft: 2,
        '&.MuiFormLabel-root': {
            lineHeight: 1
        }
    },
    btnAdd: {
        width: '150px !important',
        padding: '10px 20px !important',
        fontSize: '15px !important',
        backgroundColor: '#110FFA !important',
        color: 'white !important',
        '&:hover': {
            backgroundColor: '#110FFA !important'
        }
    },


})

export default useStyles