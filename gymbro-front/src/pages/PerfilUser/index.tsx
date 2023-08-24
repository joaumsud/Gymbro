import { Box, Grid } from "@mui/material";

const PerfilUser: React.FC = () => {
    return (
        <div className='div-main-perfil'>
            <Box className='box-father-prefil'>
                <p>Perfil</p>
                <Grid container >
                    <Grid className='' md={6} sx={{border:'1px solid red'}}>
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
                    </Grid>
                    <Grid md={6} sx={{border:'1px solid red'}}></Grid>
                </Grid>

            </Box>

        </div>
    );
}
export default PerfilUser;