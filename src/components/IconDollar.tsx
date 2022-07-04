/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Tooltip from '@mui/material/Tooltip';
import { MonetizationOnOutlined } from '@mui/icons-material';

const style = css`
    margin:-.2em 0 0 .1em;

    color:inherit;
    font-size:icon(.7) !important;
    vertical-align:middle;
`;

export default function IconDollar() {
    return (<Tooltip arrow title="달러">
        <MonetizationOnOutlined css={style} />
    </Tooltip>);
}
