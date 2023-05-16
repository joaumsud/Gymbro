import React, { useEffect, useState } from "react"
import { DialogContentFeed } from "../../hooks/addFeedback"
import { Button, Dialog, DialogContent, Grid, Typography, useTheme } from "@mui/material"
import useStyles from "./styles"
import theme from "../../theme"

interface DialogFeedback {
    message: DialogContentFeed
}

interface FeedbackTypeContent {
    backgroudColor: string;
    icon: any;
}

export type FeedbackType = 'success' | 'error'

const FeedbackDialog: React.FC<DialogFeedback> = (props: DialogFeedback) => {
    const classes = useStyles()
    // const theme = useTheme()
    const [open, setOpen] = useState(false)
    const { message } = props

    const handleClose = () => {
        setOpen(false)
    }

    const handleOpen = () => {
        setOpen(true)
    }

    useEffect(() => {
        if (message.description) {
            handleOpen()
        }
    }, [message])

    const FEEDBACK_BY_TYPE: { [key: string]: FeedbackTypeContent } = {
        error: {
            backgroudColor: theme.palette.info.light,
            icon: <></>
        },
        success: {
            backgroudColor: theme.palette.secondary.light,
            icon: <></>
        }
    }

    const getFeedbackStyle = (type: string): FeedbackTypeContent => {
        return FEEDBACK_BY_TYPE[type]
    }

    return (
        <Dialog
            onClose={handleClose}
            open={open}
            maxWidth="sm"
            classes={{ paper: classes.paperRoot }}
        >
            <DialogContent
                style={{ backgroundColor: `${getFeedbackStyle(message?.typeMessage!)?.backgroudColor}` }}>
                <Grid
                    className={classes.dialogStyle}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography variant="h4">{message.description}</Typography>
                    <Button onClick={handleClose}
                        style={{ marginTop: '50px' }}
                        sx={{
                            fontSize:'15px',
                            padding:'10px 30px',
                            backgroundColor: '#110FFA',
                            "&:hover": {
                                backgroundColor: '#110FFA',
                            }
                        }}>
                        Ok
                    </Button>
                </Grid>
            </DialogContent>

        </Dialog>
    )
}

export default FeedbackDialog