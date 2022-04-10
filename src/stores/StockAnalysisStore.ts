import { makeAutoObservable } from "mobx";
import StockAnalysisBoardStore from "./StockAnalysisBoardStore";
import StockAnalysisDetailStore from "./StockAnalysisDetailStore";

export default class StockAnalysisStore {
    detailStore: StockAnalysisDetailStore;
    boardStore: StockAnalysisBoardStore;
    isin: string;

    constructor() {
        this.boardStore = new StockAnalysisBoardStore(this);
        this.detailStore = new StockAnalysisDetailStore();
        this.isin = "";

        makeAutoObservable(this);
    }

    setIsin(isin: string): void {
        if (this.isin === isin) return;

        const path = `/stockAnalysis/${isin}`;
        if ( window.location.pathname !== path ) {
            window.history.pushState({}, "", `/stockAnalysis/${isin}`);
        }

        this.isin = isin;
        this.detailStore.updateData(isin);
    }
}
