import { observer } from 'mobx-react';
import DetailHeader from './DetailHeader';
import DetailChart from './DetailChart';
import { useStockAnalysisStore } from '../../providers/RootStoreProvider';

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
                <DetailChart />
            </>
        }
    </section>);
});
