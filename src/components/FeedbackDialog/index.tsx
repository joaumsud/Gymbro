import React, { useEffect, useState } from "react"
import { DialogContentFeed } from "../../hooks/addFeedback"
import { Button, Dialog, DialogContent, Grid, Typography } from "@mui/material"
import useStyles from "./styles"

interface DialogFeedback {
    message: DialogContentFeed
}

const FeedbackDialog: React.FC<DialogFeedback> = (props: DialogFeedback) => {
    const classes = useStyles()

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

    return (
        <Dialog
            onClose={handleClose}
            open={open}
            maxWidth="sm"
            classes={{ paper: classes.paperRoot }}
        >
            <DialogContent>
                <Grid
                    className={classes.dialogStyle}
                    display='flex'
                    direction='column'
                    alignItems="center"
                    alignContent="center"
                >
                    <Typography variant="h4">{message.description}</Typography>
                    <Button onClick={handleClose}>Ok</Button>
                </Grid>
            </DialogContent>

        </Dialog>
    )
}

export default FeedbackDialog