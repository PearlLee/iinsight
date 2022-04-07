import { render, screen } from '@testing-library/react';

import { rows } from '../../stockData';
import BoardTable from './BoardTable';

describe('StockAnalysis/BoardTable', () => {
    test('check small screen menuicon', () => {
        render(<BoardTable isin={rows[0].info.isin} setIsin={jest.fn()} toggle={false} toggleBoard={jest.fn()} media="small" />);
        expect(screen.queryByTestId('CloseIcon')).toBeTruthy();
    });

    test('check large screen', () => {
        render(<BoardTable isin={rows[0].info.isin} setIsin={jest.fn()} toggle={false} toggleBoard={jest.fn()} media="large" />);
        expect(screen.queryByTestId('CloseIcon')).toBeNull();
    });
});
