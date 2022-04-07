import { screen } from '@testing-library/react';

import renderWithRootStore from '../../test/renderWithRootStore';
import BoardTable from './BoardTable';

describe('StockAnalysis/BoardTable', () => {
    test('check small screen menuicon', () => {
        renderWithRootStore(<BoardTable toggle={false} toggleBoard={jest.fn()} media="small" />);
        expect(screen.queryByTestId('CloseIcon')).toBeTruthy();
    });

    test('check large screen', () => {
        renderWithRootStore(<BoardTable toggle={false} toggleBoard={jest.fn()} media="large" />);
        expect(screen.queryByTestId('CloseIcon')).toBeNull();
    });
});
