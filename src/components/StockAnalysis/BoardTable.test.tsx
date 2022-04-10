import { screen } from '@testing-library/react';

import { renderWithStockAnalysisStore } from '../../test/renderWithStore';
import BoardTable from './BoardTable';

describe('StockAnalysis/BoardTable', () => {
    test('check small screen menuicon', () => {
        renderWithStockAnalysisStore(<BoardTable toggle={false} toggleBoard={jest.fn()} media="small" />);
        expect(screen.queryByTestId('CloseIcon')).toBeTruthy();
    });

    test('check large screen', () => {
        renderWithStockAnalysisStore(<BoardTable toggle={false} toggleBoard={jest.fn()} media="large" />);
        expect(screen.queryByTestId('CloseIcon')).toBeNull();
    });
});
