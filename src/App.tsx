import { useState, useEffect } from 'react';
import { theme } from './styles/theme';
import { ThemeProvider } from '@mui/material/styles';
import { RootStoreProvider } from './providers/RootStoreProvider';
import GNB from './components/GNB';
import Detail from './components/StockAnalysis/Detail';
import BoardTable from './components/StockAnalysis/BoardTable';

import './styles/app.scss';

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

    return (<RootStoreProvider>
        <ThemeProvider theme={theme}>
            <GNB index={0} toggleBoard={setToggleBoard} media={media} />
            <section className="container">
                <Detail />
                <BoardTable toggle={toggle} toggleBoard={setToggleBoard} media={media} />
            </section>
        </ThemeProvider>
    </RootStoreProvider>);
}

export default App;
