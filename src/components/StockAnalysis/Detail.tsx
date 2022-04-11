import { observer } from 'mobx-react';
import { Skeleton, Box, CircularProgress } from '@mui/material';

import DetailHeader from './DetailHeader';
import DetailCharts from './DetailCharts';
import { useStockAnalysisStore } from '../../providers/StockStoreProvider';
import Style from '../../styles/detail.module.scss';

export default observer(function Detail() {
    const stockAnalysisStore = useStockAnalysisStore();
    const { headerData } = stockAnalysisStore.detailStore;

    return(<section className="detailContainer">
        {headerData === null && 
            <Box className={Style.loading}>
                <div>
                    <Skeleton width="30%" height="4em" animation="wave" />
                    <Skeleton width="50%" height="2em" animation="wave" />
                </div>
                <div>
                    <CircularProgress />
                </div>
            </Box>
        }
        {headerData !== null &&
            <>
                <DetailHeader />
                <DetailCharts />
            </>
        }
    </section>);
});
