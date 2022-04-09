import { runInAction, observable, makeAutoObservable } from "mobx";
import { getDetail } from "../api";
import { IStockDetailHeaderData } from "../interfaces/IStockDetailData";

export default class StockAnalysisDetailStore {
    headerData:IStockDetailHeaderData | null;

    constructor() {
        this.headerData = null;

        makeAutoObservable(this, { headerData: observable });
    }

    updateData(isin: string) {
        this.fetchData(isin);
    }

    async fetchData(isin: string) {
        const data = await getDetail(isin);
        const { info } = data;
        
        runInAction(() => {
            this.headerData = {
                info: info.stockinfo,
                base_price: info.base_price,
                prev_price: info.prev_price,
                hold_amount: info.hold_amount,
                buy_amount: info.buy_amount,
                sell_amount: info.sell_amount,
                hold_quantify: info.hold_quantify,
                buy_quantify: info.buy_quantify,
                sell_quantify: info.sell_quantify,
                change_price: info.base_price - info.prev_price,
                change_percent: (info.base_price - info.prev_price) / info.base_price * 100,
            }
        });
    }
}
