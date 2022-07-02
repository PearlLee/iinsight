import { act } from 'react-dom/test-utils';

import BoardTableGrid from './BoardTableGrid';

describe('StockAnalysis/BoardTableGrid', () => {
    test('check default list', () => {
        //const stockAnalysisStore = new StockAnalysisStore();
        // const { rows } = stockAnalysisStore.boardStore;

        //renderWithStockAnalysisStore(<BoardTableGrid selectedTab="hold" />, stockAnalysisStore);
        const tbody = document.querySelector('tbody');
        // expect(tbody?.querySelectorAll("tr").length === rows.length).toBeTruthy();
    });

    test('check send isin to prop', () => {
        //const stockAnalysisStore = new StockAnalysisStore();
        // const { rows } = stockAnalysisStore.boardStore;

        //renderWithStockAnalysisStore(<BoardTableGrid selectedTab="hold" />, stockAnalysisStore);
        act(() => {
            const tbody = document.querySelector('tbody');
            // expect(tbody?.querySelectorAll("tr").length === rows.length).toBeTruthy();

            tbody?.querySelectorAll("tr")[1].click();
        });

        // expect(stockAnalysisStore.isin === rows[1].info.isin).toBeTruthy();
    });
});
