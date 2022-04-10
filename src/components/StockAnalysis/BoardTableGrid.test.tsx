import { act } from 'react-dom/test-utils';
import StockAnalysisStore from '../../stores/StockAnalysisStore';

import { renderWithStockAnalysisStore } from '../../test/renderWithStore';
import BoardTableGrid from './BoardTableGrid';

describe('StockAnalysis/BoardTableGrid', () => {
    test('check default list', () => {
        const stockAnalysisStore = new StockAnalysisStore();
        const { rows } = stockAnalysisStore.boardStore;

        renderWithStockAnalysisStore(<BoardTableGrid/>, stockAnalysisStore);
        const tbody = document.querySelector('tbody');
        expect(tbody?.querySelectorAll("tr").length === rows.length).toBeTruthy();
    });

    test('check send isin to prop', () => {
        const stockAnalysisStore = new StockAnalysisStore();
        const { rows } = stockAnalysisStore.boardStore;

        renderWithStockAnalysisStore(<BoardTableGrid/>, stockAnalysisStore);
        act(() => {
            const tbody = document.querySelector('tbody');
            expect(tbody?.querySelectorAll("tr").length === rows.length).toBeTruthy();

            tbody?.querySelectorAll("tr")[1].click();
        });

        expect(stockAnalysisStore.isin === rows[1].info.isin).toBeTruthy();
    });
});
