import { observer } from 'mobx-react';
import DetailHeader from './DetailHeader';
import DetailCharts from './DetailCharts';
import { useStockAnalysisStore } from '../../providers/StockStoreProvider';

export default observer(function Detail() {
    const stockAnalysisStore = useStockAnalysisStore();
    const { headerData } = stockAnalysisStore.detailStore;

    return(<section className="detailContainer">
        {headerData === null && 
            <p>데이터 없음</p>
        }
        {headerData !== null &&
            <>
                <DetailHeader />
                <DetailCharts />
            </>
        }
    </section>);
});
