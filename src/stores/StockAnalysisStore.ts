import { makeAutoObservable } from "mobx";
import StockAnalysisBoardStore from "./StockAnalysisBoardStore";

export default class StockAnalysisStore {
    boardStore: StockAnalysisBoardStore;
    isin: string;

    constructor() {
        this.boardStore = new StockAnalysisBoardStore();
        this.isin = "";

        const { rows } = this.boardStore;
        if (rows.length > 0) {
            this.isin = rows[0].info.isin;
        }

        makeAutoObservable(this);
    }

    setIsin(isin: string): void {
        this.isin = isin;
    }
}
