import { makeStyles } from '@mui/styles'
import theme from '../../theme'

const useStyles = makeStyles({
    popOver: {
        // backgroundColor: theme.palette.primary.main
        padding: '10px'
    },
    btnFilter: {
        width: '150px !important',
        padding: '10px 17px !important',
        fontSize: '13px !important',
        backgroundColor: '#110FFA !important',
        color: 'white !important',
        marginLeft: '1.5rem !important',
        marginTop: '1.1rem !important',
        '&:hover': {
            backgroundColor: '#110FFA !important'
        }
    }
})

export default useStyles