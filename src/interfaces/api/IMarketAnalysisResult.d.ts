import IStockInfo from "../IStockinfo";

export interface IMarketAnalysisResult {
    base_date: string;
    diff_date: string;
    result: {
        stockinfo: IStockInfo;
        base_price: number;
        diff_price: number;
        diff_hold_amount: number;
        hold_amount: number;
    }[];
}