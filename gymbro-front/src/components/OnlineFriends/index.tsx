import { Box } from "@mui/material"

const OnlineFriends: React.FC = () => {
    return (
        <Box style={{ overflowY: 'scroll', height: '90vh' }} sx={{ py: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
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