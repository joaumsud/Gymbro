import { Box, Grid } from "@mui/material";

const PerfilUser: React.FC = ()=> {
    return (
        <div className='div-main-perfil'>
            <Box className='box-father-prefil'>
                <Grid style={{ display: 'flex', justifyContent: 'end', marginBottom: '10px' }}>
                   <p>Perfil</p>
                
                </Grid>
                <Box className='box-style-prefil'>
                    <p>Nome</p>
                </Box>
                <Box className='box-style-prefil'>
                    <p>Endereço</p>
                </Box>
                <Box className='box-style-prefil'>
                    <p>Idade</p>
                </Box>
                <Box className='box-style-prefil'>
                    <p>@Instagram</p>
                </Box>
                <Box className='box-style-prefil'>
                    <p>Facebook</p>
                </Box>
                <Box className='box-style-discription'>
                    <p>Fale sobre você...</p>
                </Box>
            </Box>

        </div>
    );
}
export default PerfilUser;