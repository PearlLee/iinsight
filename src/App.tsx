/** @jsxImportSource @emotion/react */
import { Global, css } from '@emotion/react';
import { useState, useEffect } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from '@mui/material/styles';

import { theme } from './styles/theme';
import GNB from './components/GNB';
import StockAnalysis from './components/StockAnalysis';
import NotFound from './components/NotFound';
import './styles/app.css';
import MarketAnalysis from './components/MarketAnalysis';
import { colors } from './styles/theme';
import { size, box, buttonInit } from './styles/Global';

const queryClient = new QueryClient();

function App() {
    const [toggle, setToggle] = useState(true);

    //화면 너비 체크
    const matchMedia = () => {
        return window.matchMedia('screen and (max-width:1200px)').matches ? 'small' : 'large';
    }
    const [media, setMedia] = useState(matchMedia);
    const handlerMatchMedia = () => {
        setMedia(matchMedia());
    }

    useEffect(() => {
        window.addEventListener('resize', handlerMatchMedia);

        return () => {
            window.removeEventListener('resize', handlerMatchMedia);
        }
        // eslint-disable-next-line
    }, []);

    const setToggleBoard = (value: boolean) => {
        setToggle(value);
    }

    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={theme}>
                <Router>
                    <Global styles={css`
                        html, body {
                            background-color:${colors.bg};
                            color:${colors.text.primary};
                            font: 16px/1.5em -apple-system, BlinkMacSystemFont, "Noto Sans KR", "Segoe UI", "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";

                            @media screen and (max-width:600px) {
                                font-size:14px;
                            }
                        }
                        .container {
                            display:flex;
                            max-width:${size.maxWidth};
                            margin:0 auto;
                            padding:0 2rem 4rem;

                            @media screen and (max-width:${size.minWidth}) {
                                display:block;
                            }
                        }
                        .detailContainer {
                            flex-grow: 1;
                        }

                        .boardTable {
                            align-self:flex-start;
                            flex-basis:20vw;
                            position:sticky;
                            top:1rem;
                            min-width:460px;
                            margin-left:4rem;

                            box-sizing:border-box;

                            & > div {
                                ${box};
                                /* padding:0 .6rem .6rem; */

                                background-color:${colors.table.body.bg};
                            }

                            @media screen and (max-width:${size.minWidth}) {
                                position:fixed;
                                top:0;
                                left:0;
                                right:0;
                                bottom:0;
                                overflow:auto;
                                z-index:99;
                                min-width:0;
                                margin:0;
                                padding-left:3.8rem;

                                box-sizing:border-box;
                                transition:background-color .4s;

                                &[area-hidden="true"] {
                                    overflow:hidden;
                                    z-index:-999;
                                    width:0;

                                    opacity:0;
                                    pointer-events:none;

                                    & > div {
                                        transform:translateX(20%);
                                    }
                                }
                                &[area-hidden="false"] {
                                    background-color:rgba(240, 240, 240, .8);
                                }

                                & > div {
                                    max-width:460px;
                                    min-height:100vh;
                                    margin-left:auto;

                                    border-radius:0;
                                    transition:transform .3s;
                                }
                            }
                        }

                        .MuiButtonBase-root,
                        .MuiButton-root {
                            ${buttonInit};
                        }

                        :disabled {
                            opacity:.5 !important;
                            cursor:not-allowed;
                            pointer-events: auto;
                        }
                    `} />
                    <GNB toggleBoard={setToggleBoard} media={media} />
                    <Routes>
                        <Route path="/" element={<Navigate replace to="/stockAnalysis" />} />
                        <Route path="stockAnalysis" element={<StockAnalysis toggle={toggle} toggleBoard={setToggleBoard} media={media} />}>
                            <Route path=":isin" element={<StockAnalysis toggle={toggle} toggleBoard={setToggleBoard} media={media} />} />
                        </Route>
                        <Route path="marketAnalysis" element={<MarketAnalysis />} />
                        <Route path="*" element={<NotFound />}/>
                    </Routes>
                </Router>
            </ThemeProvider>
        </QueryClientProvider>
    );
}

export default App;
