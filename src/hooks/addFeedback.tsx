import { stepContentClasses } from '@mui/material';
import React, { createContext, useCallback, useContext, useState } from 'react'
import FeedbackDialog from '../components/FeedbackDialog';

export interface DialogContentFeed {
    description?: string;
    typeMessage?: 'error' | 'success';
    okButtonAction?: () => void
}

interface DialogContendDTO {
    addFedback(message: DialogContentFeed): void
}

const FeedbackContext = createContext<DialogContendDTO>({} as DialogContendDTO);

export const useFeedback = (): DialogContendDTO => useContext(FeedbackContext)

export const FeedbackProvider = ({ children }: any) => {
    const [message, setMessage] = useState<DialogContentFeed>({} as DialogContentFeed)

    const addFedback = useCallback((content: DialogContentFeed) => {
        setMessage(content)
    }, [])

    return (
        <FeedbackContext.Provider value={{ addFedback }}>
            {children}
            <FeedbackDialog message={message} />
        </FeedbackContext.Provider>
    )
}

export default { FeedbackProvider }



