import { act } from 'react-dom/test-utils';

import renderWithRootStore from '../../test/renderWithRootStore';
import RootStore from '../../stores/RootStore';
import BoardTableGrid from './BoardTableGrid';

describe('StockAnalysis/BoardTableGrid', () => {
    test('check default list', () => {
        const rootStore = new RootStore();
        const { rows } = rootStore.stockAnalysisStore.boardStore;

        renderWithRootStore(<BoardTableGrid/>, rootStore);
        const tbody = document.querySelector('tbody');
        expect(tbody?.querySelectorAll("tr").length === rows.length).toBeTruthy();
    });

    test('check send isin to prop', () => {
        const rootStore = new RootStore();
        const { rows } = rootStore.stockAnalysisStore.boardStore;

        renderWithRootStore(<BoardTableGrid />, rootStore);
        act(() => {
            const tbody = document.querySelector('tbody');
            expect(tbody?.querySelectorAll("tr").length === rows.length).toBeTruthy();

            tbody?.querySelectorAll("tr")[1].click();
        });

        expect(rootStore.stockAnalysisStore.isin === rows[1].info.isin).toBeTruthy();
    });
});
