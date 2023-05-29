import { makeStyles } from '@mui/styles'
import theme from '../../theme'

const useStyles = makeStyles({
    modalStyle: {
        overflowY: 'scroll',
        height: '600px',
        minHeight: '600px',
        width: '550px',
        [theme.breakpoints.down('md')]:{
            width:'450px'
        }
    },
    formStyle: {
        padding: '1.2rem 0'
    },
    inputsStyle:{
      margin:'15px 0px !important'  
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
    }

})

export default useStyles