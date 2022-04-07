import { render, screen } from '@testing-library/react';
import { rows } from '../../stockData';
import Detail from './Detail';

describe('StockAnalysis/Detail', () => {
    test('Has no data', () => {
        render(<Detail isin=""/>);
        const noDataText = screen.getByText('데이터 없음');
        expect(noDataText).toBeTruthy();
    });

    test('has data', () => {
        render(<Detail isin={rows[0].info.isin}/>);
        const nameText = screen.getByText(rows[0].info.name);
        expect(nameText).toBeTruthy();
    });
});
