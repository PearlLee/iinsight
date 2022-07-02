import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useQuery } from 'react-query';
import { Box, Table, TableHead, TableBody, TableRow, TableCell, TableSortLabel, Skeleton, Typography } from '@mui/material';
import { visuallyHidden } from '@mui/utils';

import { getRank } from "../../api";
import IStockBoardData from '../../interfaces/IStockBoardData';
import LocaleNumber from '../LocaleNumber';
import Change from '../Change';
import IconDollar from '../IconDollar';
import Style from '../../styles/boardTable.module.scss';

type Order = 'asc' | 'desc';

interface IHeadCell {
    index: keyof IStockBoardData;
    label: string;
}

interface IEnhancedTableProps {
    numSelected: number;
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof IStockBoardData) => void;
    order: Order;
    orderBy: string;
    rowCount: number;
    dataKey: keyof IStockBoardData;
    dataLabel: string;
}

function EnhancedTableHead(props: IEnhancedTableProps) {
    const { order, orderBy, onRequestSort } =
        props;
    const createSortHandler =
        (property: keyof IStockBoardData) => (event: React.MouseEvent<unknown>) => {
            onRequestSort(event, property);
        };

    let headCells: IHeadCell[] = [
        {
            index: 'info',
            label: '종목명',
        },
        {
            index: 'base_price',
            label: '기준가',
        },
        {
            index: props.dataKey,
            label: props.dataLabel,
        }
    ];

    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell, index) => (
                    <TableCell
                        key={headCell.index}
                        align='center'
                        sortDirection={orderBy === headCell.index ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.index}
                            direction={orderBy === headCell.index ? order : 'asc'}
                            onClick={createSortHandler(headCell.index)}
                        >
                            {headCell.label}
                            {index === 2 && <IconDollar />}
                            {orderBy === headCell.index ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                        {index < headCells.length - 1 && <span className="divider"></span>}
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

interface IProps {
    selectedTab: string;
}
export default function BoardTableGrid(props: IProps) {
    const { isin: routerIsin } = useParams();
    const navigate = useNavigate();
    const query = useQuery(["BoardTable", { selectedTab: props.selectedTab }], async () => {
        const rankResult = await getRank(props.selectedTab);

        return rankResult.result.map<IStockBoardData>((element) => {
            return {
                info: element.stockinfo,
                base_price: element.base_price,
                prev_price: element.prev_price,
                hold_amount: element.hold_amount,
                change_price: element.base_price - element.prev_price,
                change_percent: (element.base_price - element.prev_price) / element.base_price * 100,
                buy_amount: element.buy_amount,
                sell_amount: element.sell_amount,
                net_buy_amount: element.buy_amount - element.sell_amount,
                net_sell_amount: element.sell_amount - element.buy_amount,
            }
        });
    });

    // 페이지가 처음 로딩 되었을 때, 첫번째 종목이 선택되도록 함
    useEffect(() => {
        if (routerIsin === undefined && query.data !== undefined && query.data.length > 0) {
            navigate(query.data[0].info.isin);
        }
    }, [routerIsin, query, navigate]);

    const rows = query.data || [];
    const isLoading = query.isLoading;

    const [order, setOrder] = useState<Order>('desc');
    const [orderBy, setOrderBy] = useState<keyof IStockBoardData>('base_price');

    const handleRequestSort = (
        event: React.MouseEvent<unknown>,
        property: keyof IStockBoardData,
    ) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleClick = (event: React.MouseEvent<unknown>, isin: string) => {
        navigate(isin);
    };

    const sortFunction = (a: IStockBoardData, b: IStockBoardData): number => {
        if (orderBy === 'info') {
            let result = a.info.ticker.localeCompare(b.info.ticker);
            return order === 'asc' ? result : result * -1;
        }
        if (a[orderBy] < b[orderBy]) {
            return order === 'asc' ? -1 : 1;
        }
        else if (a[orderBy] > b[orderBy]) {
            return order === 'asc' ? 1 : -1;
        }
        else {
            return 0;
        }
    }

    let dataKey: keyof IStockBoardData = 'hold_amount';
    let dataLabel = '보유 금액';

    switch (props.selectedTab) {
        case "hold":
            {
                dataKey = 'hold_amount';
                dataLabel = '보유 금액';
                break;
            }
        case "buy":
            {
                dataKey = 'buy_amount';
                dataLabel = '매수 금액';
                break;
            }
        case "sell":
            {
                dataKey = 'sell_amount';
                dataLabel = '매도 금액';
                break;
            }
        case "net_buy":
            {
                dataKey = 'net_buy_amount';
                dataLabel = '순매수 결제';
                break;
            }

        case "net_sell":
            {
                dataKey = 'net_sell_amount';
                dataLabel = '순매도 결제';
                break;
            }
    }

    useEffect(() => {
        setOrderBy(dataKey);
        setOrder('desc');
    }, [dataKey]);

    return (<section className={Style.table}>
        <Table>
            <EnhancedTableHead
                numSelected={rows.findIndex((item) => item.info.isin === routerIsin)}
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
                rowCount={rows.length}
                dataKey={dataKey}
                dataLabel={dataLabel}
            />
            <TableBody>
                {isLoading && <tr className="isLoading">
                    <td>
                        <Skeleton animation="wave" />
                        <Typography variant="caption"><Skeleton animation="wave" width={50} /></Typography>
                    </td>
                    <td>
                        <Skeleton animation="wave" />
                        <Typography variant="caption"><Skeleton animation="wave" width={50} /></Typography>
                    </td>
                    <td>
                        <Skeleton animation="wave" />
                    </td>
                </tr>}
                {!isLoading && rows.slice().sort(sortFunction).map((row, index) => {
                    const rowIsin = row.info.isin;
                    const rowTicker = row.info.ticker;
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                        <TableRow
                            hover
                            role="checkbox"
                            tabIndex={-1}
                            key={index}
                            selected={rowIsin === routerIsin}
                            onClick={(event) => handleClick(event, rowIsin)}
                        >
                            <TableCell
                                component="th"
                                id={labelId}
                                scope="row"
                            >
                                {rowTicker}
                                <span>
                                    {row.info.name}
                                </span>
                            </TableCell>
                            <TableCell>
                                <LocaleNumber>{row.base_price}</LocaleNumber>
                                <Change point={row.change_price} percent={row.change_percent} />
                            </TableCell>
                            <TableCell align="center"><LocaleNumber>{row[dataKey]}</LocaleNumber></TableCell>
                        </TableRow>
                    );
                })}
            </TableBody>
        </Table>
    </section>);
};
