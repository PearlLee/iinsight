import { makeAutoObservable, observable, runInAction } from "mobx";
import { getRank } from "../api";
import IStockBoardData from "../interfaces/IStockBoardData";
import StockAnalysisStore from "./StockAnalysisStore";

export type Tab = "hold" | "buy" | "sell" | "net_buy" | "net_sell";

export default class StockAnalysisBoardStore {
    rows: IStockBoardData[];
    selectedTab: Tab;
    isLoading: boolean;
    private _stockAnalysisStore: StockAnalysisStore;

    constructor(stockAnalysisStore: StockAnalysisStore) {
        this._stockAnalysisStore = stockAnalysisStore;
        this.selectedTab = "hold";
        this.isLoading = false;
        this.rows = [];

        makeAutoObservable(this, { rows: observable.shallow });
        this.fetchBoard(this.selectedTab);
    }

    setSelectedTab(selectedTab: Tab) {
        this.selectedTab = selectedTab;
        this.fetchBoard(selectedTab);
    }

    async fetchBoard(type: string) {
        runInAction(() => {
            this.isLoading = true;
        });
        
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
                    net_buy_amount: element.buy_amount - element.sell_amount,
                    net_sell_amount: element.sell_amount - element.buy_amount,
                }
            });
            if (this._stockAnalysisStore.isin === "" && this.rows.length > 0) {
                this._stockAnalysisStore.setIsin(this.rows[0].info.isin);
            }
            this.isLoading = false;
        });
    }
}
