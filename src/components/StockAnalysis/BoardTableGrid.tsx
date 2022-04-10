import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react';
import { Box, Table, TableHead, TableBody, TableRow, TableCell, TableSortLabel, Skeleton, Typography } from '@mui/material';
import { visuallyHidden } from '@mui/utils';

import { useStockAnalysisStore } from '../../providers/StockStoreProvider';
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
                        { index < headCells.length - 1 && <span className="divider"></span>}
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

export default observer(function BoardTableGrid() {
    const stockAnalysisStore = useStockAnalysisStore();
    const { rows, selectedTab, isLoading } = stockAnalysisStore.boardStore;

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
        stockAnalysisStore.setIsin(isin);
    };

    const sortFunction = (a: IStockBoardData, b: IStockBoardData): number => {
        if (orderBy === 'info') {
            let result = a.info.ticker.localeCompare(b.info.ticker);
            return order === 'asc'? result: result*-1;
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

    switch(selectedTab) {
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

    return(<section className={Style.table}>
        <Table>
            <EnhancedTableHead
                numSelected={rows.findIndex((item) => item.info.isin === stockAnalysisStore.isin)}
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
                    const { isin, ticker } = row.info;
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                        <TableRow
                            hover
                            role="checkbox"
                            tabIndex={-1}
                            key={index}
                            selected={isin === stockAnalysisStore.isin}
                            onClick={(event) => handleClick(event, isin)}
                        >
                            <TableCell
                                component="th"
                                id={labelId}
                                scope="row"
                            >
                                {ticker}
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
});
