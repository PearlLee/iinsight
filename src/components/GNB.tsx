/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { NavLink as RouterLink, useMatch } from 'react-router-dom';
import { Button, Stack, IconButton } from '@mui/material';
import { PushPin, Menu, MovingOutlined } from '@mui/icons-material';

import { colors } from '../styles/theme';
import { size, box, buttonInit } from '../styles/Global';

interface IGNBProps {
    toggleBoard: (value: boolean) => void;
    media: string;
}

const header = css`
    display:flex;
    align-items:center;

    background-color:${colors.box};
    margin-bottom:2rem;
    padding:1rem 2rem;

    &:before,
    &:after {
        display:block;
        flex-basis:calc(50% - 1000px);

        content:'';
    }

    h1 > a {
        ${box};
        color:${colors.text.block};
        font-size:2rem;
        font-weight:700;

        svg {
            color:${colors.primary.text};
            font-size:1em;

            & + span {
                margin-left:.3em;
            }
        }
        @media screen and (min-width:${size.minWidth}) {
            margin-left:-1rem;
            padding-left:1rem;
            padding-right:1rem;
        }
        @media screen and (max-width:${size.minWidth}) {
            & > span {
                display:none;
            }
        }
    }

    .menu {
        align-items:center;
        margin-left:1rem;
        
        & > * {
            ${box};
            ${buttonInit};
            padding:.5rem;

            font-size:1.2rem;
            white-space:nowrap;

            @media screen and (min-width:${size.minWidth}) {
                margin:0 2rem 0 0;
            
                &:last-child {
                    margin-right:0;
                }
            }

            &:after {
                display:inline-block;
                width:.8em;

                content:'';
                vertical-align:middle;
            }

            &.active {
                color:${colors.text.block};
            }

            .iconPin {
                margin:0 0 0 -.3em;

                color: ${colors.primary.text};
                transform:translate(10%, -30%) rotate(-15deg);
                vertical-align:middle;
            }
            &:not(.active) {
                .iconPin {
                    opacity:0;
                }
            }
        }
    }

    .buttonToggleBoard {
        margin-left:auto;
    }
`;

export default function GNB(props: IGNBProps) {
    const matchStockAnalysis = useMatch("/stockAnalysis/:isin");

    const handlerToggleBoard = () => {
        props.toggleBoard(false);
    }

    return(
        <section css={header}>
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
                className="menu"
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
                (props.media === 'small' && matchStockAnalysis) &&
                <IconButton className="buttonToggleBoard" onClick={handlerToggleBoard}>
                    <Menu />
                </IconButton>
            }
        </section>
    );
}
