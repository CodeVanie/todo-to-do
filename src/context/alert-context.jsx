import { createContext } from "react"

export const AlertContext = createContext();

const alertMessages = [
    {
        id: "a_0",
        title: "Chill!",
        message: "Please select a list first."
    },
    {
        id: "a_1",
        title: "Pick One!",
        message: "Please select an item first"
    },
    {
        id: "a_2",
        title: "Pick One!",
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