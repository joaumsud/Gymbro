import React, { createContext, useCallback, useContext, useState } from "react";
import CustomBackdrop from "../components/CustomBackdrop";


interface BackdropContextDTO {
    handleBackdrop: (loading: boolean, message?: string) => void;
}

const BackdropContext = createContext<BackdropContextDTO>(
    {} as BackdropContextDTO,
);

export const useBackdrop = (): BackdropContextDTO => useContext(BackdropContext)


export default function BackdropProvider({ children }: any) {

    const [openBackdrop, setOpenBackdrop] = useState(false)
    const [message, setMessage] = useState<string>()

    const handleBackdrop = useCallback((loading: boolean, message?: string) => {
        setOpenBackdrop(loading)
        setMessage(message)
    }, [])

    return (
        <BackdropContext.Provider value={{ handleBackdrop }}>
            {children}
            <CustomBackdrop open={openBackdrop} message={message} />
        </BackdropContext.Provider>
    )

}




export { BackdropProvider }