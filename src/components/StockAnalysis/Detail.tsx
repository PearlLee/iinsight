/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useParams } from 'react-router';
import { useQuery } from 'react-query';
import { Skeleton, Box, CircularProgress } from '@mui/material';

import DetailHeader from './DetailHeader';
import DetailCharts from './DetailCharts';
import { getDetail } from "../../api";
import { IStockDetailStat } from "../../interfaces/IStockDetailData";
import { box } from '../../styles/Global';

const loading = css`
    & > div:first-of-type {
        margin-bottom:1rem;

        & > *:nth-of-type(2) {
            margin-top:-.6em;
        }
    }

    & > div:last-of-type {
        ${box};
        display:flex;
        justify-content: center;
        align-items: center;
        height:60vh;
    
        text-align:center;
    }
`;

export default function Detail() {
    const { isin } = useParams();
    const query = useQuery(["StockDetail", { isin }], async () => {
        if (isin === undefined) return;
        const data = await getDetail(isin);
        const { info, stats } = data;

        return {
            headerData: {
                info: info.stockinfo,
                base_price: info.base_price,
                prev_price: info.prev_price,
                hold_amount: info.hold_amount,
                buy_amount: info.buy_amount,
                sell_amount: info.sell_amount,
                hold_quantify: info.hold_quantify,
                buy_quantify: info.buy_quantify,
                sell_quantify: info.sell_quantify,
                change_price: info.base_price - info.prev_price,
                change_percent: (info.base_price - info.prev_price) / info.base_price * 100,
            },
            stats: stats.map<IStockDetailStat>((element) => {
                return {
                    volume_amount: element.buy_amount + element.sell_amount,
                    volume_quantify: element.buy_quantify + element.sell_quantify,
                    ...element
                }
            })
        }
    });

    return (<section className="detailContainer">
        {query.isLoading &&
            <Box css={loading}>
                <div>
                    <Skeleton width="30%" height="4em" animation="wave" />
                    <Skeleton width="50%" height="2em" animation="wave" />
                </div>
                <div>
                    <CircularProgress />
                </div>
            </Box>
        }
        {query.data !== undefined &&
            <>
                <DetailHeader headerData={query.data.headerData} />
                <DetailCharts stats={query.data.stats} />
            </>
        }
    </section>);
};
