import { render } from "@testing-library/react";
import { ReactElement } from "react";
import { StockAnalysisStoreProvider } from "../providers/StockStoreProvider";
import StockAnalysisStore from "../stores/StockAnalysisStore";

export function renderWithStockAnalysisStore(ui: ReactElement, store?: StockAnalysisStore) {
    const wrapper = ({children}: {children: typeof ui}) => (
        <StockAnalysisStoreProvider store={store}>{children}</StockAnalysisStoreProvider>
    );
    return render(ui, { wrapper })
}