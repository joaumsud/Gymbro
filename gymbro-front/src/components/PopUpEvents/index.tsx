import { Box, Button, Typography } from "@mui/material"

export interface PopUpEventsDTO {
    title: string;
    date: string;
}

const PopUpEvents: React.FC<PopUpEventsDTO> = ({ title, date }) => {
    return (
        <>
            <Box>
                <Typography variant="h6">{title}</Typography>
                <Typography variant="body1">{date}</Typography>
                <Button>Ver mais</Button>
            </Box>
        </>
    )
}

export default PopUpEvents