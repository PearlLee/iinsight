/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

interface ILocaleNumberProps {
    children: number,
}

const number = css`
    font-family: "Roboto", sans-serif;
`;

export default function LocaleNumber(props: ILocaleNumberProps) {
    return(<span css={number}>{props.children.toLocaleString()}</span>)
}
