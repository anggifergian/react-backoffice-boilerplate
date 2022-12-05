import { createContext } from "react";

export const SidebarContext = createContext();

export function SidebarProvider({ children, value }) {
    return (
        <SidebarContext.Provider value={value}>
            {children}
        </SidebarContext.Provider>
    )
}