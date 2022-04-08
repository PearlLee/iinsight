import { observer } from 'mobx-react';
import { Divider } from '@mui/material';

import { useStockAnalysisStore } from '../../providers/RootStoreProvider';
import Change from '../Change';
import IconDollar from '../IconDollar';
import Style from '../../styles/detail.module.scss';

interface IDetailProps {
    isin: string;
}
export default observer(function Detail(props: IDetailProps) {
    const stockAnalysisStore = useStockAnalysisStore();
    const { rows } = stockAnalysisStore.boardStore;

    const row = rows.find((item) => item.info.isin === props.isin);

    return(<>
        {row === undefined && 
            <p>데이터 없음</p>
        }
        {row !== undefined &&
            <header className={Style.header}>
                <div className={Style.title}>
                    <h1>{row.info.slang && <strong>{row.info.slang}</strong>}<span>{row.info.ticker}</span><sub>{row.info.name}</sub></h1>
                    <Divider orientation="vertical" flexItem />
                    <dl className={Style.price}>
                        <dt>기준가</dt>
                        <dd>
                            {row.base_price}
                            <Change point={row.change_price} percent={row.change_percent} />
                        </dd>
                    </dl>
                </div>
                
                <div className={Style.info}>
                    <dl>
                        <dt>전일 가격</dt>
                        <dd>{row.prev_price}</dd>
                    </dl>
                    <dl>
                        <dt>보유 금액<IconDollar /></dt>
                        <dd>{row.hold_amount}</dd>
                    </dl>
                    <dl>
                        <dt>매수 결제<IconDollar /></dt>
                        <dd>{row.buy_amount}</dd>
                    </dl>
                    <dl>
                        <dt>매도 결제<IconDollar /></dt>
                        <dd>{row.sell_amount}</dd>
                    </dl>
                </div>
            </header>
        }
    </>);
});
