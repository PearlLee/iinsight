/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

import { colors } from '../styles/theme';
import { blind, stock } from '../styles/Global';

interface IChangeProps {
    point: number,
    percent: number,
}

const change = css`
    ${stock};
    display:inline-block;

    font-weight:500;
    vertical-align:middle;

    .percent {
        display:inline-block;
        margin:-.15em 0 0 .2em;
        padding:0 .2em;
    
        border-radius:.2em;
        color:${colors.bg};
        font-family: "Roboto", sans-serif;
        line-height:1.2;
        vertical-align:middle;
    }
    
    &[data-sign^="+"] .percent {
        background-color:${colors.stock.red};
        opacity:.8;
    }
    &[data-sign=""] .percent {
        ${blind};
    }
    &[data-sign^="-"] .percent {
        background-color:${colors.stock.blue};
        opacity:.8;
    }
`;

export default function Change(props: IChangeProps) {
    let sign:string = "";
    
    if (props.point < 0) {
        sign = "-";
    }
    else if (props.point > 0) {
        sign = "+";
    }

    const signStr: string = (
        sign === "+" ? "+" : ""
    );

    return(<span className="change" data-sign={sign} css={change}>
        {signStr}{props.point.toFixed(2)}
        <span className="percent">{signStr}{props.percent.toFixed(2)}%</span>
    </span>)
}
