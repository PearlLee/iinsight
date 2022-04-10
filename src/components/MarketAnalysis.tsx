import { useState, useMemo, useEffect } from "react";
import { observer } from "mobx-react";
import moment from "moment";
import { TextField, Alert, Divider, Button } from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { LocalizationProvider, DatePicker} from '@mui/lab';

import MarketAnalysisStore from "../stores/MarketAnalysisStore";
import { MarketAnalysisStoreProvider } from "../providers/MarketStoreProvider";
import MarketChart from "./MarketAnalysis/MarketChart";
import Style from '../styles/market.module.scss';

export default observer(function MarketAnalysis() {
    const marketAnalysisStore = useMemo(() => new MarketAnalysisStore(), []);
    const [diffDate, setDiffDate] = useState<Date | null>(null);
    const [baseDate, setBaseDate] = useState<Date | null>(null);

    useEffect(() => {
        if ( diffDate === null && marketAnalysisStore.diff_date !== "") {
            setDiffDate(new Date(marketAnalysisStore.diff_date));
        }
    }, [marketAnalysisStore.diff_date, diffDate]);

    useEffect(() => {
        if ( baseDate === null && marketAnalysisStore.base_date !== "") {
            setBaseDate(new Date(marketAnalysisStore.base_date));
        }
    }, [marketAnalysisStore.base_date, baseDate]);

    const submit = () => {
        marketAnalysisStore.fetch(moment(baseDate).format("YYYY-MM-DD"), moment(diffDate).format("YYYY-MM-DD"));
    }


    return(<MarketAnalysisStoreProvider>
        <section className={"container " + Style.marketContainer}>
            <header>
                <div className={Style.datePickerWrap}>
                    <LocalizationProvider
                        dateAdapter={AdapterDateFns}
                    >
                        <DatePicker
                            label="기준일"
                            value={diffDate}
                            inputFormat="yyyy-MM-dd"
                            onChange={(newValue) => {
                                setDiffDate(newValue);
                            }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                    <Divider orientation="vertical" variant="middle" flexItem />
                    <LocalizationProvider
                        dateAdapter={AdapterDateFns}
                    >
                        <DatePicker
                            label="비교일"
                            value={baseDate}
                            inputFormat="yyyy-MM-dd"
                            onChange={(newValue) => {
                                setBaseDate(newValue);
                            }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>

                    <Button variant="outlined" onClick={() => {submit()}}>조회하기</Button>
                </div>
                <Alert severity="info">기준일과 비교일을 지정하여 보유금액의 변화를 트리맵차트로 보여줍니다.</Alert>
            </header>
            <MarketChart stats={marketAnalysisStore.data} />
        </section>
    </MarketAnalysisStoreProvider>);
});