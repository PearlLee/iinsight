import { render, screen } from '@testing-library/react';

import { rows } from '../../stockData';
import BoardTableGrid from './BoardTableGrid';

describe('StockAnalysis/BoardTableGrid', () => {
    test('check default list', () => {
        render(<BoardTableGrid isin={rows[0].info.isin} setIsin={jest.fn()}/>);
        const tbody = document.querySelector('tbody');
        expect(tbody?.querySelectorAll("tr").length === rows.length).toBeTruthy();
    });

    test('check send isin to prop', () => {
        let mockSetIsin = jest.fn();
        render(<BoardTableGrid isin={rows[0].info.isin} setIsin={mockSetIsin} />);
        const tbody = document.querySelector('tbody');
        expect(tbody?.querySelectorAll("tr").length === rows.length).toBeTruthy();

        tbody?.querySelectorAll("tr")[1].click();

        expect(mockSetIsin.mock.calls.length == 1).toBeTruthy();
        expect(mockSetIsin.mock.calls[0][0] === rows[1].info.isin).toBeTruthy();
    });
});
