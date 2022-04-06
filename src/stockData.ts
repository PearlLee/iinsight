import { IStockData } from './interfaces/IStockData';

type Info = IStockData['info'];

function createData(
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

export const rows: IStockData[] = [
    createData({isin: 'US88160R1014', ticker: '1TSLA', name: 'TESLA INC', slang: '테슬라'}, 1029.93, 20.17, 1.96, 1050.1, 1751519000, 79857061000, 50315547000),
    createData({isin: 'US0378331005', ticker: '2AAPL', name: 'APPLE INC', slang: '애플'}, 169.83, -3.18, -1.87, 1050.1, 1651519000, 79857061000, 50315547000)
]
