import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from '@mui/material/styles';

import { theme } from './styles/theme';
import GNB from './components/GNB';
import StockAnalysis from './components/StockAnalysis';
import NotFound from './components/NotFound';
import './styles/app.scss';
import MarketAnalysis from './components/MarketAnalysis';

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
        <ThemeProvider theme={theme}>
            <Router>
                <GNB toggleBoard={setToggleBoard} media={media} />
                <Routes>
                    <Route path="/" element={<Navigate replace to="/stockAnalysis" />} />
                    <Route path="stockAnalysis" element={<StockAnalysis toggle={toggle} toggleBoard={setToggleBoard} media={media} />}>
                        <Route path=":isin" element={<StockAnalysis toggle={toggle} toggleBoard={setToggleBoard} media={media} />} />
                    </Route>
                    <Route path="marketAnalysis" element={<MarketAnalysis />} />
                    <Route path="*" element={() => <NotFound />}/>
                </Routes>
            </Router>
        </ThemeProvider>
        );
}

export default App;
