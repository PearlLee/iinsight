/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useState } from 'react';
import { IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';

import BoardTab from './BoardTab';
// import BoardTableHeader from './BoardTableHeader';
import BoardTableGrid from './BoardTableGrid';

interface IBoardTableProps {
    toggle: boolean;
    toggleBoard: (value: boolean) => void;
    media: string;
}

const boardTable = css`
    .buttonToggleBoard {
        position:fixed;
        top:1rem;
        right:0;
        width:100%;
        max-width:calc(460px + 4.8rem);
        height:0;
        padding:0 0 0 .6rem;

        box-sizing:border-box;
    }

    .header {
        padding:1rem 0;

        .MuiFormControl-root {
            width:100%;
        }
    }
`;

export default function BoardTable(props: IBoardTableProps) {
    const [selectedTab, setSelectedTab] = useState("hold");

    const handlerToggleBoard = () => {
        props.toggleBoard(true);
    }

    const onChangeTab = (value: string) => {
        setSelectedTab(value);
    }

    return (<section css={boardTable} className="boardTable" area-hidden={props.toggle.toString()}>
        {
            props.media === 'small' &&
            <span className="buttonToggleBoard">

                <IconButton onClick={handlerToggleBoard}>
                    <Close />
                </IconButton>
            </span>
        }
        <div>
            <BoardTab onSelectTab={onChangeTab} />
            {/* <BoardTableHeader /> */}
            <BoardTableGrid selectedTab={selectedTab} />
        </div>
    </section>);
}
