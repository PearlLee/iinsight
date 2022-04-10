import { observer } from 'mobx-react';
import { Divider } from '@mui/material';

import { useStockAnalysisStore } from '../../providers/RootStoreProvider';
import LocaleNumber from '../LocaleNumber';
import Change from '../Change';
import IconDollar from '../IconDollar';
import Style from '../../styles/detail.module.scss';

export default observer(function Detail() {
    const stockAnalysisStore = useStockAnalysisStore();
    const { headerData } = stockAnalysisStore.detailStore;

    return(<>
        {headerData !== null &&
            <header className={Style.header}>
                <div className={Style.title}>
                    <h1>{headerData.info.slang && <strong>{headerData.info.slang}</strong>}<span>{headerData.info.ticker}</span><sub>{headerData.info.name}</sub></h1>
                    <Divider orientation="vertical" flexItem />
                    <dl className={Style.price}>
                        <dt>기준가</dt>
                        <dd>
                            <LocaleNumber>{headerData.base_price}</LocaleNumber>
                            <Change point={headerData.change_price} percent={headerData.change_percent} />
                        </dd>
                    </dl>
                </div>
                
                <div className={Style.info}>
                    <dl>
                        <dt>전일 가격</dt>
                        <dd><LocaleNumber>{headerData.prev_price}</LocaleNumber></dd>
                    </dl>
                    <dl>
                        <dt>보유 금액<IconDollar /></dt>
                        <dd><LocaleNumber>{headerData.hold_amount}</LocaleNumber></dd>
                    </dl>
                    <dl>
                        <dt>매수 결제<IconDollar /></dt>
                        <dd><LocaleNumber>{headerData.buy_amount}</LocaleNumber></dd>
                    </dl>
                    <dl>
                        <dt>매도 결제<IconDollar /></dt>
                        <dd><LocaleNumber>{headerData.sell_amount}</LocaleNumber></dd>
                    </dl>
                </div>
            </header>
        }
    </>);
});
