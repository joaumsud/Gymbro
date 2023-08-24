import { Box } from "@mui/material"
import useStyles from "./styles"

const OnlineFriends: React.FC = () => {
    const classes = useStyles()
    return (
        <Box className={classes.boxFriends} sx={{ py: 2 }}>
            <Box className={classes.boxOnlineCars}>
                <Box sx={{
                    border: '3px solid #64FD58',
                    width: '3rem',
                    height: '3rem',
                    borderRadius: '50%',
                    m: 1,
                    alignSelf: 'center'
                }} >
                    <img
                        src="https://picsum.photos/200/200"
                        loading="lazy"
                        style={{
                            objectFit: 'cover', width: '100%',
                            height: '100%',
                            borderRadius: '50%'
                        }}
                    />
                </Box>
                <Box sx={{
                    border: '3px solid #64FD58',
                    width: '3rem',
                    height: '3rem',
                    borderRadius: '50%',
                    m: 1,
                    alignSelf: 'center'
                }} >
                    <img
                        src="https://picsum.photos/201/201"
                        loading="lazy"
                        style={{
                            objectFit: 'cover', width: '100%',
                            height: '100%',
                            borderRadius: '50%'
                        }}
                    />
                </Box>
                <Box sx={{
                    border: '3px solid #64FD58',
                    width: '3rem',
                    height: '3rem',
                    borderRadius: '50%',
                    m: 1,
                    alignSelf: 'center'
                }} >
                    <img
                        src="https://picsum.photos/199/199"
                        loading="lazy"
                        style={{
                            objectFit: 'cover', width: '100%',
                            height: '100%',
                            borderRadius: '50%'
                        }}
                    />
                </Box>
                <Box sx={{
                    border: '3px solid #64FD58',
                    width: '3rem',
                    height: '3rem',
                    borderRadius: '50%',
                    m: 1,
                    alignSelf: 'center'
                }} >
                    <img
                        src="https://picsum.photos/198/198"
                        loading="lazy"
                        style={{
                            objectFit: 'cover', width: '100%',
                            height: '100%',
                            borderRadius: '50%'
                        }}
                    />
                </Box>
                <Box sx={{
                    border: '3px solid #64FD58',
                    width: '3rem',
                    height: '3rem',
                    borderRadius: '50%',
                    m: 1,
                    alignSelf: 'center'
                }} >
                    <img
                        src="https://picsum.photos/202/202"
                        loading="lazy"
                        style={{
                            objectFit: 'cover', width: '100%',
                            height: '100%',
                            borderRadius: '50%'
                        }}
                    />
                </Box>
            </Box>
        </Box>
    )
}

export default OnlineFriends