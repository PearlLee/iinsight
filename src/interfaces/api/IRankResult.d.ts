import IStockInfo from "../IStockinfo"

export default interface IRankResult {
    date: string,
    result: {
        stockinfo: IStockInfo, 
        base_price: number,
        prev_price: number,
        hold_amount: number,
        buy_amount: number,
        sell_amount: number
    }[],
}
