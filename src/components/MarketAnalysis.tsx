import { useEffect, useState } from "react";
import { useQuery } from 'react-query';
import moment from "moment";
import { Box, CircularProgress, TextField, Alert, Divider } from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';

import MarketChart from "./MarketAnalysis/MarketChart";
import { getMarketAnalysis } from "../api";
import Style from '../styles/market.module.scss';
import IMarketAnalysisData from "../interfaces/IMarketAnalysisData";

export default function MarketAnalysis() {
    const [baseDate, setBaseDate] = useState<Date | null>(null);
    const [diffDate, setDiffDate] = useState<Date | null>(null);

    const query = useQuery<{ data: IMarketAnalysisData[], base_date: string, diff_date: string }>(["MarketAnalysisData", { baseDate, diffDate }], async () => {
        const baseDateStr = (baseDate != null) ? moment(baseDate).format("YYYY-MM-DD") : undefined;
        const diffDateStr = (diffDate != null) ? moment(diffDate).format("YYYY-MM-DD") : undefined;
        const marketAnalysisResult = await getMarketAnalysis(baseDateStr, diffDateStr);
        return {
            data: marketAnalysisResult.result.map((element) => {
                return {
                    change_point: element.hold_amount - element.diff_hold_amount,
                    change_percent: (element.hold_amount - element.diff_hold_amount) / element.hold_amount * 100,
                    ...element
                }
            }),
            base_date: marketAnalysisResult.base_date,
            diff_date: marketAnalysisResult.diff_date
        };
    });

    const maketAnalysisData = query.data;

    useEffect(() => {
        if (diffDate === null && maketAnalysisData !== undefined && maketAnalysisData.diff_date !== "") {
            setDiffDate(new Date(maketAnalysisData.diff_date));
        }
    }, [maketAnalysisData, diffDate]);

    useEffect(() => {
        if (baseDate === null && maketAnalysisData !== undefined && maketAnalysisData.base_date !== "") {
            setBaseDate(new Date(maketAnalysisData.base_date));
        }
    }, [maketAnalysisData, baseDate]);

    return (<section className={"container " + Style.marketContainer}>
        <header>
            <div className={Style.datePickerWrap}>
                <LocalizationProvider
                    dateAdapter={AdapterDateFns}
                >
                    <DatePicker
                        label="기준일"
                        value={baseDate}
                        inputFormat="yyyy-MM-dd"
                        mask="____-__-__"
                        onChange={(newValue) => {
                            setBaseDate(newValue);
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
                        value={diffDate}
                        inputFormat="yyyy-MM-dd"
                        mask="____-__-__"
                        onChange={(newValue) => {
                            setDiffDate(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>
            </div>
            <Alert severity="info">기준일과 비교일을 지정하여 보유금액의 변화를 트리맵차트로 보여줍니다.</Alert>
        </header>
        {query.isLoading &&
            <Box className={Style.loading}>
                <CircularProgress />
            </Box>
        }
        {maketAnalysisData?.data !== undefined &&
            <MarketChart stats={maketAnalysisData.data} />
        }
    </section>);
};