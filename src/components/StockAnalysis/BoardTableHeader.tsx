import { useState } from 'react';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { LocalizationProvider, DatePicker} from '@mui/lab';

import Style from '../../styles/boardTable.module.scss';

export default function BoardTableHeader() {
    const [dateRangeValue, setDateRangeValue] = useState<Date | null>(null);

    return(
        <header className={Style.header}>
            <LocalizationProvider
                dateAdapter={AdapterDateFns}
            >
                <DatePicker
                    label="기간"
                    value={dateRangeValue}
                    onChange={(newValue) => {
                        setDateRangeValue(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                    disabled
                />
            </LocalizationProvider>
        </header>
    );
}
