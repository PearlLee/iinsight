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
        this.isin = isin;
        this.detailStore.updateData(isin);
    }
}
