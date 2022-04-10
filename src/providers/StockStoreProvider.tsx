import { createContext, ReactNode, useContext } from "react";
import StockAnalysisStore from "../stores/StockAnalysisStore";

const StoreContext = createContext<StockAnalysisStore | undefined>(undefined);
StoreContext.displayName = "StockAnalysisStore";

export function StockAnalysisStoreProvider({children, store}: {children:ReactNode, store?: StockAnalysisStore}) {
    if (store === undefined){
        store = new StockAnalysisStore();
    }

    return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
}

export function useStockAnalysisStore(): StockAnalysisStore {
    const context = useContext(StoreContext);
    if (context === undefined) {
        throw new Error("StockStoreProvider를 찾을 수 없습니다.");
    }

    return context;
}
