import { makeAutoObservable, observable } from "mobx";
import { IStockData } from '../interfaces/IStockData';

type Info = IStockData['info'];

export default class StockAnalysisBoardStore {
    rows:IStockData[];

    constructor() {
        this.rows = [
            this._createData({isin: 'US88160R1014', ticker: '1TSLA', name: 'TESLA INC', slang: '테슬라'}, 1029.93, 20.17, 1.96, 1050.1, 1751519000, 79857061000, 50315547000),
            this._createData({isin: 'US0378331005', ticker: '2AAPL', name: 'APPLE INC', slang: '애플'}, 169.83, -3.18, -1.87, 1050.1, 1651519000, 79857061000, 50315547000)
        ];

        makeAutoObservable(this, {rows: observable.shallow});
    }

    private _createData(
        info: Info,
        base_price: number,
        change_price: number,
        change_percent: number,
        prev_price: number,
        hold_amount: number,
        buy_amount: number,
        sell_amount: number
    ): IStockData {
        return {
            info,
            base_price,
            change_price,
            change_percent,
            prev_price,
            hold_amount,
            buy_amount,
            sell_amount
        };
    }
}
