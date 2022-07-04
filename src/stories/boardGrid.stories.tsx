import { ComponentStory, ComponentMeta } from '@storybook/react';

import '../styles/app.css';
import BoardTable from '../components/StockAnalysis/BoardTable';
import BoardTableGrid from '../components/StockAnalysis/BoardTableGrid';

export default {
    title: 'Component/Board/BoardGrid',
    component: BoardTable
} as ComponentMeta<typeof BoardTable>;

// export const row1 = () => {
//     const stockAnalysisStore = new StockAnalysisStore();
//     return <StockAnalysisStoreProvider store={stockAnalysisStore}><BoardTableGrid selectedTab="hold" /></StockAnalysisStoreProvider>
// };

// export const row2 = () => {
//     const stockAnalysisStore = new StockAnalysisStore();
//     // stockAnalysisStore.setIsin(stockAnalysisStore.boardStore.rows[1].info.isin);
//     return <StockAnalysisStoreProvider store={stockAnalysisStore}><BoardTableGrid selectedTab="hold" /></StockAnalysisStoreProvider>
// };
