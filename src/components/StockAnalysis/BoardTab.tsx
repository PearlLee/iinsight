import React, { useState } from 'react';
import { Tabs, Tab } from '@mui/material';

import Style from '../../styles/boardTab.module.scss';

interface IProps {
    onSelectTab: (value: string) => void,
}
export default function BoardTab(props: IProps) {
    const [activeItem, setActiveItem] = useState(0);

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
            <Tab label="보유" onClick={() => props.onSelectTab("hold")} />
            <Tab label="매수" onClick={() => props.onSelectTab("buy")} />
            <Tab label="매도" onClick={() => props.onSelectTab("sell")} />
            <Tab label="순매수" onClick={() => props.onSelectTab("net_buy")} />
            <Tab label="순매도" onClick={() => props.onSelectTab("net_sell")} />
        </Tabs>
    </section>);
}
