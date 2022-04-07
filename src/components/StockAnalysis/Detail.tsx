import { observer } from 'mobx-react';
import DetailHeader from './DetailHeader';
import DetailChart from './DetailChart';
import { useStockAnalysisStore } from '../../providers/RootStoreProvider';

export default observer(function Detail() {
    const stockAnalysisStore = useStockAnalysisStore();
    const { rows } = stockAnalysisStore.boardStore;

    const row = rows.find((item) => item.info.isin === stockAnalysisStore.isin);

    return(<section className="detailContainer">
        {row === undefined && 
            <p>데이터 없음</p>
        }
        {row !== undefined &&
            <>
                <DetailHeader isin={stockAnalysisStore.isin} />
                <DetailChart />
            </>
        }
    </section>);
});
