import IStockInfo from "../IStockinfo";

export interface IStockDetailHeaderData {
    info: IStockInfo, 
    base_price: number,
    prev_price: number,
    hold_amount: number,
    buy_amount: number,
    sell_amount: number,
    change_price: number,
    change_percent: number,
    hold_quantify: number,
    buy_quantify: number,
    sell_quantify: number,
}

export interface IStockDetailStat {
    created_at: string;
    base_price: number;
    hold_amount: number;
    hold_quantify: number;
    buy_amount: number;
    buy_quantify: number;
    sell_amount: number;
    sell_quantify: number;
    volume_amount: number;
    volume_quantify: number;
    [key: string]: number | string;
}
