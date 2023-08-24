import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { Box } from '@mui/material';
import { useStyles } from './style';

interface TextErrorProps {
    message: string;
}

const TextError: React.FC<TextErrorProps> = ({ message }) => {
    const classes = useStyles()
    return (
        <>
            <Box className={classes.container}>
                <WarningAmberIcon sx={{ fontSize: '20px',color:'#F94C66' }} />
                <p className={classes.textError}>{message ? message : 'Erro ao realizar login'}</p>
            </Box>
        </>
    );
}

export default TextError;