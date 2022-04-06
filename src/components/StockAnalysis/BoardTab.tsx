import React, {useState} from 'react';
import { Tabs, Tab } from '@mui/material';

import Style from '../../styles/boardTab.module.scss';

export default function BoardTab() {

    const [activeItem, setActiveItem] = useState(0);
    const items: string[] = ["보유", "매수", "매도", "순매수", "순매도"];

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
            {items.map((item, index) => {
                return <Tab key={index} label={item} />
            })}
        </Tabs>
    </section>);
}
