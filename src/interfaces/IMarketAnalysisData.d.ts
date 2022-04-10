import IStockInfo from "../IStockinfo";

export default interface IMarketAnalysisData {
    stockinfo: IStockInfo;
    base_price: number;
    diff_price: number;
    diff_hold_amount: number;
    hold_amount: number;
    change_point: number;
    change_percent: number;
}