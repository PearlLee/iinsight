import { ComponentStory, ComponentMeta } from '@storybook/react';

import '../styles/app.scss';
import BoardTable from '../components/StockAnalysis/BoardTable';
import BoardTableGrid from '../components/StockAnalysis/BoardTableGrid';
import { StockAnalysisStoreProvider } from '../providers/StockStoreProvider';
import StockAnalysisStore from '../stores/StockAnalysisStore';

export default {
    title: 'Component/Board/BoardGrid',
    component: BoardTable
} as ComponentMeta<typeof BoardTable>;

export const row1 = () => {
    const stockAnalysisStore = new StockAnalysisStore();
    return <StockAnalysisStoreProvider store={stockAnalysisStore}><BoardTableGrid /></StockAnalysisStoreProvider>
};

export const row2 = () => {
    const stockAnalysisStore = new StockAnalysisStore();
    stockAnalysisStore.setIsin(stockAnalysisStore.boardStore.rows[1].info.isin);
    return <StockAnalysisStoreProvider store={stockAnalysisStore}><BoardTableGrid /></StockAnalysisStoreProvider>
};
