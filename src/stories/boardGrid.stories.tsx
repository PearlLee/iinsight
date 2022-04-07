import { ComponentStory, ComponentMeta } from '@storybook/react';

import '../styles/app.scss';
import BoardTable from '../components/StockAnalysis/BoardTable';
import BoardTableGrid from '../components/StockAnalysis/BoardTableGrid';
import { RootStoreProvider, useRootStore } from '../providers/RootStoreProvider';
import RootStore from '../stores/RootStore';

export default {
    title: 'Component/Board/BoardGrid',
    component: BoardTable
} as ComponentMeta<typeof BoardTable>;

export const row1 = () => {
    const rootStore = new RootStore();
    return <RootStoreProvider rootStore={rootStore}><BoardTableGrid /></RootStoreProvider>
};

export const row2 = () => {
    const rootStore = new RootStore();
    rootStore.stockAnalysisStore.setIsin(rootStore.stockAnalysisStore.boardStore.rows[1].info.isin);
    return <RootStoreProvider rootStore={rootStore}><BoardTableGrid /></RootStoreProvider>
};
