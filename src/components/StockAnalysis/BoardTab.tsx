import React, {useState} from 'react';
import { Tabs, Tab } from '@mui/material';

import Style from '../../styles/boardTab.module.scss';
import { useStockAnalysisStore } from '../../providers/RootStoreProvider';

export default function BoardTab() {

    const [activeItem, setActiveItem] = useState(0);
    const { boardStore } = useStockAnalysisStore();

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setActiveItem(newValue);
    };

    return (<section className={Style.tabsContainer}>
        <Tabs
            variant="scrollable"
            scrollButtons={false}
            onChange={handleChange}
            value={activeItem}
            className={Style.tabs}
        >
            <Tab label="보유" onClick={() => boardStore.setSelectedTab("hold")} />
            <Tab label="매수" onClick={() => boardStore.setSelectedTab("buy")} />
            <Tab label="매도" onClick={() => boardStore.setSelectedTab("sell")} />
            <Tab label="순매수" onClick={() => boardStore.setSelectedTab("net_buy")} />
            <Tab label="순매도" onClick={() => boardStore.setSelectedTab("net_sell")} />
        </Tabs>
    </section>);
}
