import { createContext, ReactNode, useContext } from "react";
import RootStore from "../stores/RootStore";

const StoreContext = createContext<RootStore | undefined>(undefined);
StoreContext.displayName = "StoreContext";

export function RootStoreProvider({children}: {children:ReactNode}) {
    const rootStore = new RootStore();

    return <StoreContext.Provider value={rootStore}>{children}</StoreContext.Provider>
}

export function useRootStore(): RootStore {
    const context = useContext(StoreContext);
    if (context === undefined) {
        throw new Error("RootStoreProvider를 찾을 수 없습니다.");
    }
    
    return context;
}
