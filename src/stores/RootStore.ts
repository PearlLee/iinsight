import StockAnalysisStore from "./StockAnalysisStore";

export default class RootStore {
    stockAnalysisStore: StockAnalysisStore;

    constructor() {
        this.stockAnalysisStore = new StockAnalysisStore();
    }
}
