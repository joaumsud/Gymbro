import { Box, Grid } from "@mui/material";
import ImgHome from "../../atoms/ImgHome";
import FormLogin from "../../molecules/FormLogin";
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import CardFormLogin from "../CardLogin";

const MainHome: React.FC = () => {
    const history = useHistory()
    const [widthWindow, setWidthWindow] = useState<number>(0)

    const [windowSize, setWindowSize] = useState([
        window.innerWidth,
        window.innerHeight,
    ]);

    useEffect(() => {
        const handleWindowResize = () => {
            setWindowSize([window.innerWidth, window.innerHeight]);
        };

        window.addEventListener('resize', handleWindowResize);

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    });
    return (
        <main>
            <Grid container sx={{marginTop:'144px'}}>
                {windowSize[0] >= 1207 &&
                    <Grid item lg={6}>
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <ImgHome />
                        </Box>
                    </Grid>
                }
                <Grid item lg={6} sm={12} xs={12}>
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <CardFormLogin />
                    </Box>
                </Grid>
            </Grid>
        </main>
    );
}

export default MainHome;