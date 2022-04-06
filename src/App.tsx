import { useState, useEffect } from 'react';
import { theme } from './styles/theme';
import { ThemeProvider } from '@mui/material/styles';
import GNB from './components/GNB';
import Detail from './components/StockAnalysis/Detail';
import BoardTable from './components/StockAnalysis/BoardTable';
import { rows } from './stockData';

import './styles/app.scss';

function App() {
  const getDefaultIsin = () => {
    if(rows.length > 0) {
      return rows[0].info.isin;
    }
    return '';
  }
  const [isin, setIsin] = useState(getDefaultIsin());
  const [toggle, setToggle] = useState(true);

  //화면 너비 체크
  const matchMedia = () => {
    return window.matchMedia('screen and (max-width:1200px)').matches ? 'small': 'large';
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
  
  return (<>
    <ThemeProvider theme={theme}>
      <GNB index={0} toggleBoard={setToggleBoard} media={media}  />
      <section className="container">
        <Detail isin={isin} />
        <BoardTable isin={isin} setIsin={setIsin} toggle={toggle} toggleBoard={setToggleBoard} media={media} />
      </section>
    </ThemeProvider>
  </>);
}

export default App;
