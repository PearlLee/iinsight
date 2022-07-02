import { useState } from 'react';
import { IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';

import BoardTab from './BoardTab';
// import BoardTableHeader from './BoardTableHeader';
import BoardTableGrid from './BoardTableGrid';
import Style from '../../styles/boardTable.module.scss';

interface IBoardTableProps {
    toggle: boolean;
    toggleBoard: (value: boolean) => void;
    media: string;
}

export default function BoardTable(props: IBoardTableProps) {
    const [selectedTab, setSelectedTab] = useState("hold");

    const handlerToggleBoard = () => {
        props.toggleBoard(true);
    }

    const onChangeTab = (value: string) => {
        setSelectedTab(value);
    }

    return (<section className="boardTable" area-hidden={props.toggle.toString()}>
        {
            props.media === 'small' &&
            <span className={Style.buttonToggleBoard}>

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
