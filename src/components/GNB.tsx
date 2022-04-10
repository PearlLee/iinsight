import { NavLink as RouterLink } from 'react-router-dom';
import { Button, Stack, IconButton } from '@mui/material';
import { PushPin, Menu, MovingOutlined } from '@mui/icons-material';

import Style from '../styles/header.module.scss';

interface IGNBProps {
    toggleBoard: (value: boolean) => void;
    media: string;
}

export default function GNB(props: IGNBProps) {
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
                <RouterLink to="/stockAnalysis" className={({isActive}) => isActive? "active" :""}>
                    <PushPin className="iconPin" />
                    종목 분석
                </RouterLink>
                <RouterLink to="/marketAnalysis" className={({isActive}) => isActive? "active" :""}>
                    <PushPin className="iconPin" />
                    시장 분석
                </RouterLink>
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
