/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useState } from 'react';
import { Tabs, Tab } from '@mui/material';

import { colors } from '../../styles/theme';
import { size } from '../../styles/Global';

const boardTab = css`
    position:sticky;
    top:0;
    z-index:2;
    overflow:hidden;
    margin:0;

    background-color:${colors.box};
    border-bottom:1px solid ${colors.divider.board};

    @media screen and (min-width:${size.minWidth}) {
        border-top-left-radius:.5rem;
        border-top-right-radius:.5rem;
    }

    .tabs {
        .MuiTabs-flexContainer {
            & > button {
                min-width:20%;

                font-size:1.01rem;
                white-space:nowrap;

                &[aria-selected="true"] {
                    color:${colors.primary.text};
                    font-weight:700;
                }
            }
        }

        .MuiTabs-indicator {
            z-index:1;
            height:auto;

            background-color:transparent;

            &:before {
                display:block;
                width:1rem;
                height:4px;
                margin:0 auto;

                background-color:${colors.primary.text};
                content:'';
            }
        }
    }
`;

interface IProps {
    onSelectTab: (value: string) => void,
}
export default function BoardTab(props: IProps) {
    const [activeItem, setActiveItem] = useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setActiveItem(newValue);
    };

    return (<section css={boardTab}>
        <Tabs
            variant="scrollable"
            scrollButtons={false}
            onChange={handleChange}
            value={activeItem}
            className="tabs"
        >
            <Tab label="보유" onClick={() => props.onSelectTab("hold")} />
            <Tab label="매수" onClick={() => props.onSelectTab("buy")} />
            <Tab label="매도" onClick={() => props.onSelectTab("sell")} />
            <Tab label="순매수" onClick={() => props.onSelectTab("net_buy")} />
            <Tab label="순매도" onClick={() => props.onSelectTab("net_sell")} />
        </Tabs>
    </section>);
}
