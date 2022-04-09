import { makeAutoObservable, observable, runInAction } from "mobx";
import { getRank } from "../api";
import IStockBoardData from "../interfaces/IStockBoardData";
import StockAnalysisStore from "./StockAnalysisStore";

export default class StockAnalysisBoardStore {
    rows:IStockBoardData[];
    _stockAnalysisStore: StockAnalysisStore;

    constructor(stockAnalysisStore: StockAnalysisStore) {
        this._stockAnalysisStore = stockAnalysisStore;
        this.rows = [];

        makeAutoObservable(this, {
            rows: observable.shallow,
            _stockAnalysisStore: false}
        );
        this.fetchBoard("hold");
    }

    async fetchBoard(type: string) {
        const rankResult = await getRank(type);

        runInAction(() => {
            this.rows = rankResult.result.map<IStockBoardData>((element) => {
                return {
                    info: element.stockinfo,
                    base_price: element.base_price,
                    prev_price: element.prev_price,
                    hold_amount: element.hold_amount,
                    change_price: element.base_price - element.prev_price,
                    change_percent: (element.base_price - element.prev_price) / element.base_price * 100,
                    buy_amount: element.buy_amount,
                    sell_amount: element.sell_amount,
                }
            });
            if (this._stockAnalysisStore.isin === "" && this.rows.length > 0) {
                this._stockAnalysisStore.setIsin(this.rows[0].info.isin);
            }
        });
    }
}
