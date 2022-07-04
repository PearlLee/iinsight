/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

import { colors } from './theme';

export const size = {
    minWidth: '1200px',
    maxWidth: '2000px',
    mobileWidth: '440px',
}

export const blind = css`
    position:absolute;
    overflow:hidden;

    font-size:0;
    text-indent:-99999999px;
`;

export const box = css`
    background-color:${colors.box};
    border-radius:.5em;
`;

export const buttonInit = css`
    margin:0;
    padding:0;

    background-color:transparent;
    border:0;
    color:${colors.text.primary};
    cursor:pointer;
    text-align:center;
    text-decoration:none;

    &:hover {
        background-color:${colors.button.hover.bg} !important;
        color:${colors.button.hover.primary} !important;
    }
`;

export const stock = css` 
    font-family: 'Roboto', sans-serif;
    
    &[data-sign^="+"] {
        color:${colors.stock.red};
    }
    &[data-sign=""] {
        color:${colors.text.subtitle};
    }
    &[data-sign^="-"] {
        color:${colors.stock.blue};
    }
`