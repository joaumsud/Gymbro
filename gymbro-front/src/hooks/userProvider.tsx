import React, { createContext, useState, useContext } from 'react'

export interface UserAuth {
    user: User
}

export interface User {
    id: number
    email: string
    firstName: string
    lastName: string
    profilePictureUrl: any
    profilePicturePath: any
    isAdmin: boolean
    isActive: boolean
}

export interface UserContextValue extends UserAuth {
    addUserAuth: (
        id: number,
        email: string,
        firstName: string,
        lastName: string,
        profilePictureUrl: string | null,
        profilePicturePath: string | null,
        isAdmin: boolean,
        isActive: boolean
    ) => void;
}

const UserContext = createContext<UserContextValue>({
    user: {
        id: 0,
        email: '',
        firstName: '',
        lastName: '',
        profilePictureUrl: undefined,
        profilePicturePath: undefined,
        isAdmin: false,
        isActive: false
    },
    addUserAuth: () => { },
})

export const useUserAuth = () => useContext(UserContext)

export default function UserProvider({ children }: any) {
    const dataUser = {
        user: {
            id: 6,
            email: "user008@email.com",
            firstName: "User",
            lastName: "005",
            profilePictureUrl: null,
            profilePicturePath: null,
            isAdmin: false,
            isActive: true
        }
    }

    const [userAuth, setUserAuth] = useState<UserAuth>(dataUser)

    const addUserAuth = (
        id: number,
        email: string,
        firstName: string,
        lastName: string,
        profilePictureUrl: string | null,
        profilePicturePath: string | null,
        isAdmin: boolean,
        isActive: boolean
    ) => {
        setUserAuth({
            user: {
                id,
                email,
                firstName,
                lastName,
                profilePictureUrl,
                profilePicturePath,
                isAdmin,
                isActive
            }
        })
    }

    return (
        <UserContext.Provider value={{ user: userAuth.user, addUserAuth }}>
            {children}
        </UserContext.Provider>
    )
}