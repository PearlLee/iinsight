/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Divider } from '@mui/material';

import { IStockDetailHeaderData } from "../../interfaces/IStockDetailData";
import LocaleNumber from '../LocaleNumber';
import Change from '../Change';
import IconDollar from '../IconDollar';
import { colors } from '../../styles/theme';
import { size, blind } from '../../styles/Global';

interface IProps {
    headerData: IStockDetailHeaderData,
}

const header = css`
    .title {
        display:flex;
        flex-wrap:wrap;
        align-items:center;
        margin-bottom:1rem;
    
        color:${colors.text.block};

        h1 {
            line-height:1em;
    
            strong {
                margin-right:.5em;
            }
            & > span {
                font-weight:500;
                color:${colors.text.subtitle};
            }
            strong,
            span:first-of-type {
                color:${colors.text.block};
            }
    
            sub {
                display:block;
                margin-top:.2rem;
    
                color:${colors.text.subtitle};
                font-weight:400;
                font-size:.6em;
                line-height:1.5em;
                white-space:break-spaces;
            }
        }

        .MuiDivider-root {
            align-self:inherit;
            height:2rem;
            margin:0 2rem;

            border-width:2px;
            border-color:${colors.divider.primary};
        }
    
        dl {
            position:relative;
    
            font-size:2.2rem;
            line-height:1;
    
            dt {
                ${blind}
            }
            dd {
                display:inline-block;
    
                font-weight:700;
                
                .change {
                    margin:0 0 0 .5em;
    
                    font-size:.6em;
                }
            }
        }
    }

    .info {
        margin:0 -1rem 2rem;
        padding:.3rem 1rem;

        background-color:rgba(255, 255,255, .3);
        border-radius:1em;
        font-size:1.03rem;

        &,
        dl {
            display:flex;
            flex-wrap:wrap;
            align-items:center;
        }

        dl {
            flex-basis:25%;
            margin:.1rem 0;

            @media screen and (max-width:${size.minWidth}) {
                flex-basis:50%;
            }
            @media screen and (max-width:${size.mobileWidth}) {
                flex-basis:100%;
            }

            dt {
                flex-basis:6rem;
                margin-right:1rem;

                box-sizing:border-box;
                opacity:.7;
                white-space:nowrap;

                @media screen and (max-width:${size.mobileWidth}) {
                    flex-basis:auto;
                }
            }

            dd {
                font-family: "Roboto", sans-serif;
            }
        }
    }
`;
export default function Detail(props: IProps) {
    const { headerData } = props;

    return (<>
        {headerData !== null &&
            <header css={header}>
                <div className="title">
                    <h1>{headerData.info.slang && <strong>{headerData.info.slang}</strong>}<span>{headerData.info.ticker}</span><sub>{headerData.info.name}</sub></h1>
                    <Divider orientation="vertical" flexItem />
                    <dl className="price">
                        <dt>기준가</dt>
                        <dd>
                            <LocaleNumber>{headerData.base_price}</LocaleNumber>
                            <Change point={headerData.change_price} percent={headerData.change_percent} />
                        </dd>
                    </dl>
                </div>

                <div className="info">
                    <dl>
                        <dt>전일 가격</dt>
                        <dd><LocaleNumber>{headerData.prev_price}</LocaleNumber></dd>
                    </dl>
                    <dl>
                        <dt>보유 금액<IconDollar /></dt>
                        <dd><LocaleNumber>{headerData.hold_amount}</LocaleNumber></dd>
                    </dl>
                    <dl>
                        <dt>매수 결제<IconDollar /></dt>
                        <dd><LocaleNumber>{headerData.buy_amount}</LocaleNumber></dd>
                    </dl>
                    <dl>
                        <dt>매도 결제<IconDollar /></dt>
                        <dd><LocaleNumber>{headerData.sell_amount}</LocaleNumber></dd>
                    </dl>
                </div>
            </header>
        }
    </>);
};
