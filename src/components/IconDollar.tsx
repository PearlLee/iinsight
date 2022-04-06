import Tooltip from '@mui/material/Tooltip';
import { MonetizationOnOutlined } from '@mui/icons-material';

export default function IconDollar() {
    return (<Tooltip arrow title="달러">
        <MonetizationOnOutlined className="iconDollar" />
    </Tooltip>);
}
