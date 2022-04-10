import { createContext, ReactNode, useContext } from "react";
import MarketAnalysisStore from "../stores/MarketAnalysisStore";

const StoreContext = createContext<MarketAnalysisStore | undefined>(undefined);
StoreContext.displayName = "MarketAnalysisStore";

export function MarketAnalysisStoreProvider({children, store}: {children:ReactNode, store?: MarketAnalysisStore}) {
    if (store === undefined){
        store = new MarketAnalysisStore();
    }

    return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
}

export function useMarketAnalysisStore(): MarketAnalysisStore {
    const context = useContext(StoreContext);
    if (context === undefined) {
        throw new Error("MarketAnalysisStoreProvider를 찾을 수 없습니다.");
    }

    return context;
}
