export interface IStockData {
    info: {
        isin: string,
        ticker: string,
        name: string,
        slang?: string,
    };
    
    base_price: number,
    change_price: number, // 백엔드에서는 prev_price를 주고 base_price와 비교해서 구하는데 우선은 이렇게 해둬도 될듯
    change_percent: number,

    prev_price: number, // (전일가)
    hold_amount: number, // (보유 금액)
    buy_amount: number, // (매수 금액)
    sell_amount: number, // (매도 금액)
}
