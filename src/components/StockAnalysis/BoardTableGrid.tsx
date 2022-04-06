import React, { useState } from 'react';
import { Box, Table, TableHead, TableBody, TableRow, TableCell, TableSortLabel } from '@mui/material';
import { visuallyHidden } from '@mui/utils';

import { IStockData } from '../../interfaces/IStockData';
import { rows } from '../../stockData';
import Change from '../Change';
import IconDollar from '../IconDollar';
import Style from '../../styles/boardTable.module.scss';
    
type Order = 'asc' | 'desc';

interface IHeadCell {
    index: keyof IStockData;
    label: string;
}

const headCells: readonly IHeadCell[] = [
    {
        index: 'info',
        label: '종목명',
    },
    {
        index: 'base_price',
        label: '기준가',
    },
    {
        index: 'hold_amount',
        label: '보유잔고',
    }
];

interface IEnhancedTableProps {
    numSelected: number;
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof IStockData) => void;
    order: Order;
    orderBy: string;
    rowCount: number;
}

function EnhancedTableHead(props: IEnhancedTableProps) {
    const { order, orderBy, onRequestSort } =
        props;
    const createSortHandler =
        (property: keyof IStockData) => (event: React.MouseEvent<unknown>) => {
        onRequestSort(event, property);
    };

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
                            {headCell.index === 'hold_amount' && <IconDollar />}
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

interface IBoardTableRowProps {
    isin: string;
    setIsin: (isin:string) => void;
}

export default function BoardTableGrid(props: IBoardTableRowProps) {
    const [order, setOrder] = useState<Order>('desc');
    const [orderBy, setOrderBy] = useState<keyof IStockData>('base_price');

    const handleRequestSort = (
        event: React.MouseEvent<unknown>,
        property: keyof IStockData,
      ) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleClick = (event: React.MouseEvent<unknown>, isin: string) => {
        props.setIsin(isin);
    };

    const sortFunction = (a: IStockData, b: IStockData): number => {
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

    return(<section className={Style.table}>
        <Table>
            <EnhancedTableHead
                numSelected={rows.findIndex((item) => item.info.isin === props.isin)}
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
                rowCount={rows.length}
            />
            <TableBody>
                {rows.sort(sortFunction).map((row, index) => {
                    const { isin, ticker } = row.info;
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                        <TableRow
                            hover
                            role="checkbox"
                            tabIndex={-1}
                            key={index}
                            selected={isin === props.isin}
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
                                {row.base_price}
                                <Change point={row.change_price} percent={row.change_percent} />
                            </TableCell>
                            <TableCell align="center">{row.hold_amount}</TableCell>
                        </TableRow>
                    );
                })}
            </TableBody>
        </Table>
    </section>);
}
