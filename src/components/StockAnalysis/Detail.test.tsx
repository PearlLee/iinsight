import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import Detail from './Detail';

describe('StockAnalysis/Detail', () => {
    test('Has no data', () => {
        //const stockAnalysisStore = new StockAnalysisStore();
        //stockAnalysisStore.setIsin('');

        //renderWithStockAnalysisStore(<Detail />, stockAnalysisStore);

        const noDataText = screen.getByText('데이터 없음');
        expect(noDataText).toBeTruthy();
    });

    test('has data', () => {
        //const stockAnalysisStore = new StockAnalysisStore();
        // const { rows } = stockAnalysisStore.boardStore;

        //renderWithStockAnalysisStore(<Detail />, stockAnalysisStore);
        // const nameText = screen.getByText(rows[0].info.name);
        // expect(nameText).toBeTruthy();
    });
});
