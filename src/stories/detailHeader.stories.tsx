import { ComponentMeta } from '@storybook/react';

import '../styles/app.scss';
import DetailHeader from '../components/StockAnalysis/DetailHeader';
import RootStore from '../stores/RootStore';
import { RootStoreProvider } from '../providers/RootStoreProvider';

export default {
    title: 'Component/Detail',
    component: DetailHeader,
    argTypes: {
    },
} as ComponentMeta<typeof DetailHeader>;


export const detailHeader = () => {
    const rootStore = new RootStore();
    return <RootStoreProvider rootStore={rootStore}><DetailHeader isin={rootStore.stockAnalysisStore.isin} /></RootStoreProvider>
};
