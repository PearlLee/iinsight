import IStockInfo from "../IStockinfo"

export default interface IDetailResult {
    stats: {
        created_at: string,
        base_price: number,
        hold_amount: number,
        buy_amount: number,
        sell_amount: number,
        hold_quantify: number,
        buy_quantify: number,
        sell_quantify: number
    }[],
    info: {
        stockinfo: IStockInfo, 
        base_price: number,
        prev_price: number,
        hold_amount: number,
        buy_amount: number,
        sell_amount: number,
        hold_quantify: number,
        buy_quantify: number,
        sell_quantify: number,
    },
}
