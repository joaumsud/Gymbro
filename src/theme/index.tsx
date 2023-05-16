import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#07142B',
        },
        secondary: {
            main: '#110FFA',
            light: '#6A19E3'
        },
        info: {
            main: '#C90FFA',
            light: '#F00E3D'
        }
    },
});

export default theme