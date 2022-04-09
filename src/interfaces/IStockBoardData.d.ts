import IStockInfo from "../IStockinfo";

export default interface IStockBoardData {
    info: IStockInfo, 
    base_price: number,
    prev_price: number,
    hold_amount: number,
    buy_amount: number,
    sell_amount: number,
    change_price: number,
    change_percent: number,
}
