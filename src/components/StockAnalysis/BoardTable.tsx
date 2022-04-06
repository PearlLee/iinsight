import { IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';

import BoardTab from './BoardTab';
import BoardTableHeader from './BoardTableHeader';
import BoardTableGrid from './BoardTableGrid';
import Style from '../../styles/boardTable.module.scss';

interface IBoardTableProps {
    isin: string;
    setIsin : (index:string) => void;
    toggle: boolean;
    toggleBoard: (value: boolean) => void;
    media: string;
}

export default function BoardTable(props: IBoardTableProps) {
    const handlerToggleBoard = () => {
        props.toggleBoard(true);
    }
    return(<section className="boardTable" area-hidden={props.toggle.toString()}>
        {
            props.media === 'small' &&
            <span className={Style.buttonToggleBoard}>

                <IconButton onClick={handlerToggleBoard}>
                    <Close />
                </IconButton>
            </span>
        }
        <div>
            <BoardTab />
            <BoardTableHeader />
            <BoardTableGrid isin={props.isin} setIsin={props.setIsin} />
        </div>
    </section>);
}
