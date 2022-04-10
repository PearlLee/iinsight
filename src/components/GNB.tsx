import { Button, Stack, IconButton } from '@mui/material';
import { PushPin, Menu, MovingOutlined } from '@mui/icons-material';

import Style from '../styles/header.module.scss';

interface IGNBProps {
    index: number;
    toggleBoard: (value: boolean) => void;
    media: string;
}
export default function GNB(props: IGNBProps) {
    const index = props.index;

    const handlerToggleBoard = () => {
        props.toggleBoard(false);
    }

    return(
        <section className={Style.header}>
            <h1>
                {
                    props.media === 'large' &&
                    <Button href="/">
                        <MovingOutlined />
                        <span>Iinsight</span>
                    </Button>
                }
                {
                    props.media === 'small' &&
                    <IconButton href="/">
                        <MovingOutlined />
                    </IconButton>
                }
            </h1>
            <Stack 
                direction="row" 
                className={Style.menu}
            >
                <Button href="/" aria-selected={index === 0}>
                    <PushPin className="iconPin" />
                    종목 분석
                </Button>
                <Button aria-selected={index === 1} disabled>
                    <PushPin className="iconPin" />
                    시장 분석
                </Button>
            </Stack>
            {
                props.media === 'small' &&
                <IconButton className={Style.buttonToggleBoard} onClick={handlerToggleBoard}>
                    <Menu />
                </IconButton>
            }
        </section>
    );
}
