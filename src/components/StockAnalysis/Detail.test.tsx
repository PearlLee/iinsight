import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import RootStore from '../../stores/RootStore';
import renderWithRootStore from '../../test/renderWithRootStore';
import Detail from './Detail';

describe('StockAnalysis/Detail', () => {
    test('Has no data', () => {
        const rootStore = new RootStore();
        rootStore.stockAnalysisStore.setIsin('');

        renderWithRootStore(<Detail/>, rootStore);

        const noDataText = screen.getByText('데이터 없음');
        expect(noDataText).toBeTruthy();
    });

    test('has data', () => {
        const rootStore = new RootStore();
        const { rows } = rootStore.stockAnalysisStore.boardStore;

        renderWithRootStore(<Detail/>, rootStore);
        const nameText = screen.getByText(rows[0].info.name);
        expect(nameText).toBeTruthy();
    });
});
