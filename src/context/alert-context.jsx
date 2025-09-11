import { createContext } from "react"

export const AlertContext = createContext();

const alertMessages = [
    {
        id: "a_0",
        message: "Please select a list first."
    },
    {
        id: "a_1",
        message: "Please select an item to edit."
    },
    {
        id: "a_2",
        message: "You cannot edit multiple items at the same time.\nPlease select 1 item only."
    }
]

export default function AlertContextProvider({ children }) {
    return (
        <AlertContext.Provider value={{alertMessages}}>
            {children}
        </AlertContext.Provider>
    )
}