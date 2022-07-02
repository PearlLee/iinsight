import { Component } from "react";
import Chart from "react-apexcharts";
import moment from "moment";
import memoize from "memoize-one";

import { IStockDetailStat } from "../../interfaces/IStockDetailData";
import Style from '../../styles/detail.module.scss';

interface StockDetailChartsProps {
    stats: IStockDetailStat[];
}

interface StockDetaiChartsState {
    options: ApexCharts.ApexOptions;
    optionsVolume: ApexCharts.ApexOptions;
}

export default class StockDetailCharts extends Component<StockDetailChartsProps, StockDetaiChartsState> {
    constructor(props: StockDetailChartsProps) {
        super(props);

        this.state = this.createState();
    }

    createStockYAxisOption(
        base_price_min?: number,
        base_price_max?: number,
        hold_amount_min?: number,
        hold_amount_max?: number,
        hold_quantify_min?: number,
        hold_quantify_max?: number,
        buy_sell_amount_min?: number,
        buy_sell_amount_max?: number
    ): ApexYAxis | ApexYAxis[] {
        return [
            {
                axisTicks: {
                    show: true,
                },
                axisBorder: {
                    show: true,
                    color: "#008FFB",
                },
                labels: {
                    style: {
                        colors: "#008FFB",
                    },
                },
                title: {
                    text: "기준가",
                    style: {
                        color: "#008FFB",
                        fontFamily: "맑은 고딕",
                    },
                },
                tooltip: {
                    enabled: true,
                },
                min: base_price_min,
                max: base_price_max,
            },
            {
                show: false,
                seriesName: "보유금액",
                opposite: true,
                decimalsInFloat: 0,
                axisTicks: {
                    show: true,
                },
                axisBorder: {
                    show: true,
                    color: "#00E396",
                },
                title: {
                    text: "Hold Amount",
                    style: {
                        color: "#00E396",
                    },
                },
                tooltip: {
                    enabled: false,
                },
                min: hold_amount_min,
                max: hold_amount_max,
            },

            {
                show: false,
                seriesName: "보유수량",
                opposite: true,
                decimalsInFloat: 0,
                axisTicks: {
                    show: true,
                },
                axisBorder: {
                    show: true,
                    color: "#00E396",
                },
                title: {
                    text: "Hold Quantify",
                    style: {
                        color: "#00E396",
                    },
                },
                tooltip: {
                    enabled: false,
                },
                min: hold_quantify_min,
                max: hold_quantify_max,
            },
            {
                show: false,
                seriesName: "매수금액",
                decimalsInFloat: 0,
                opposite: true,
                axisTicks: {
                    show: true,
                },
                axisBorder: {
                    show: true,
                },
                title: {
                    text: "Buy Amount",
                },
                tooltip: {
                    enabled: false,
                },
                min: buy_sell_amount_min,
                max: buy_sell_amount_max,
            },
            {
                show: false,
                seriesName: "매도금액",
                decimalsInFloat: 0,
                opposite: true,
                axisTicks: {
                    show: true,
                },
                axisBorder: {
                    show: true,
                },
                title: {
                    text: "Sell Amount",
                },
                tooltip: {
                    enabled: false,
                },
                min: buy_sell_amount_min,
                max: buy_sell_amount_max,
            },
        ];
    }
    createVolumeYAxisOption(volume_min?: number, volume_max?: number): ApexYAxis | ApexYAxis[] {
        return {
            axisTicks: {
                show: true,
            },
            axisBorder: {
                show: true,
            },
            labels: {
                minWidth: 50,
            },
            title: {
                text: "거래량",
                style: {
                    fontFamily: "맑은 고딕",
                },
            },
            tooltip: {
                enabled: false,
            },
            min: volume_min,
            max: volume_max,
        };
    }
    resetYAxis() {
        ApexCharts.exec("stock", "updateOptions", { yaxis: this.createStockYAxisOption() });
        ApexCharts.exec("volume", "updateOptions", { yaxis: this.createVolumeYAxisOption() });
    }

    createState(): StockDetaiChartsState {
        const tickDay = 15;

        const setYAxis = (min: Date, max: Date, test: any) => {
            let filterRows = this.props.stats.filter(
                (row) => new Date(row.created_at) >= min && new Date(row.created_at) <= max
            );
            let base_prices = filterRows.map((row) => row.base_price);
            let hold_amounts = filterRows.map((row) => row.hold_amount);
            let hold_quantify = filterRows.map((row) => row.hold_quantify);
            let buy_amounts = filterRows.map((row) => row.buy_amount);
            let sell_amounts = filterRows.map((row) => row.sell_amount);

            let base_price_min = Math.min(...base_prices);
            let base_price_max = Math.max(...base_prices);
            let hold_amount_min = Math.min(...hold_amounts);
            let hold_amount_max = Math.max(...hold_amounts);
            let hold_quantify_min = Math.min(...hold_quantify);
            let hold_quantify_max = Math.max(...hold_quantify);
            let buy_sell_amount_min = Math.min(...buy_amounts, ...sell_amounts);
            let buy_sell_amount_max = Math.max(...buy_amounts, ...sell_amounts);

            ApexCharts.exec("stock", "updateOptions", {
                yaxis: this.createStockYAxisOption(
                    base_price_min,
                    base_price_max,
                    hold_amount_min,
                    hold_amount_max,
                    hold_quantify_min,
                    hold_quantify_max,
                    buy_sell_amount_min,
                    buy_sell_amount_max
                ),
            });

            let volumes = filterRows.map((row) => row.buy_quantify + row.sell_quantify);
            let volume_min = Math.min(...volumes);
            let volume_max = Math.max(...volumes);

            ApexCharts.exec("volume", "updateOptions", {
                yaxis: this.createVolumeYAxisOption(volume_min, volume_max),
            });
        };

        const beforeZoom = (e: any, options?: any) => {
            const { xaxis } = options;
            if (this.props.stats == null) {
                return { xaxis };
            }
            const dataMin = new Date(this.props.stats[0].created_at).valueOf();
            const dataMax = new Date(this.props.stats[this.props.stats.length - 1].created_at).valueOf();

            const calcMin = Math.max(dataMin, xaxis.min);
            const calcMax = Math.min(dataMax, xaxis.max);

            const minDuration = 86400 * 1000 * tickDay;
            const duration = calcMax - calcMin;

            let zoomInfo: any = null;

            if (duration < minDuration) {
                // TODO: 이거 양쪽 끝에 잇으면 이상한 버그 생김
                zoomInfo = {
                    xaxis: {
                        min: calcMin - (minDuration - duration) / 2,
                        max: calcMax + (minDuration - duration) / 2,
                    },
                };
            } else {
                zoomInfo = {
                    xaxis: {
                        min: calcMin,
                        max: calcMax,
                    },
                };
            }

            setYAxis(zoomInfo.xaxis.min, zoomInfo.xaxis.max, e);
            return zoomInfo;
        };

        const beforeResetZoom = (e: any, options?: any) => {
            this.resetYAxis();
        };

        const options: ApexCharts.ApexOptions = {
            chart: {
                id: "stock",
                group: "stockcharts",
                width: "100%",
                height: 500,
                zoom: {
                    enabled: true,
                },
                animations: {
                    enabled: false,
                    dynamicAnimation: {
                        enabled: false,
                    },
                },
                events: {
                    beforeZoom,
                    beforeResetZoom,
                    mounted: () => {
                        this.hideSeries();
                    }
                },
            },
            dataLabels: {
                enabled: false,
            },
            markers: {
                size: 0,
                hover: {
                    sizeOffset: 6,
                },
            },
            yaxis: this.createStockYAxisOption(),
            xaxis: {
                type: "datetime",
                tickAmount: tickDay,
                labels: {
                    formatter: function (e) {
                        return moment(e).format("YYYY-MM-DD");
                    },
                },
            },
            tooltip: {
                y: {
                    formatter: function (e: any, opts: any) {
                        switch (opts.seriesIndex) {
                            case 0:
                                // 기준가
                                return parseFloat(e).toFixed(2);
                            case 2:
                                // 보유 수량
                                return e.toLocaleString();
                            case 1:
                            case 3:
                            case 4:
                                // 매수, 매도, 보유 금액
                                return "$" + parseFloat(e).toLocaleString();
                        }
                        return "";
                    },
                },
            },
            grid: {
                show: true,
            },
            theme: {},
        };
        const optionsVolume: ApexCharts.ApexOptions = {
            chart: {
                width: "100%",
                height: 150,
                group: "stockcharts",
                id: "volume",
                stacked: true,
                zoom: {
                    enabled: true,
                    autoScaleYaxis: true,
                },
                animations: {
                    enabled: false,
                    dynamicAnimation: {
                        enabled: false,
                    },
                },
                events: {
                    beforeZoom,
                    beforeResetZoom,
                },
            },
            stroke: {
                curve: "stepline",
            },
            dataLabels: {
                enabled: false,
            },
            xaxis: {
                type: "datetime",
                tickAmount: tickDay,
                labels: {
                    formatter: function (e) {
                        return moment(e).format("YYYY-MM-DD");
                    },
                },
            },
            yaxis: this.createVolumeYAxisOption(),
            markers: {
                size: 0,
                hover: {
                    sizeOffset: 6,
                },
            },
            tooltip: {
                y: {
                    formatter: function (e: any, opts: any) {
                        return parseFloat(e).toLocaleString();
                    },
                },
            },
        };

        return {
            options,
            optionsVolume,
        };
    }

    computeSeries = memoize((rows: IStockDetailStat[]) => {
        if (rows == null) {
            return [];
        }

        return [
            {
                name: "기준가",
                type: "line",
                data: rows.map((row: IStockDetailStat) => {
                    return { x: row.created_at, y: row.base_price };
                }),
            },
            {
                name: "보유금액",
                type: "line",
                data: rows.map((row) => {
                    return { x: row.created_at, y: row.hold_amount };
                }),
            },
            {
                name: "보유수량",
                type: "line",
                data: rows.map((row) => {
                    return { x: row.created_at, y: row.hold_quantify };
                }),
            },
            {
                name: "매수금액",
                type: "line",
                data: rows.map((row) => {
                    return { x: row.created_at, y: row.buy_amount };
                }),
            },
            {
                name: "매도금액",
                type: "line",
                data: rows.map((row) => {
                    return { x: row.created_at, y: row.sell_amount };
                }),
            },
        ];
    });

    computeSeriesVolume = memoize((rows: IStockDetailStat[]) => {
        if (rows == null) {
            return [];
        }

        return [
            {
                name: "매수수량",
                type: "area",
                data: rows.map((row) => {
                    return { x: row.created_at, y: row.buy_quantify };
                }),
            },
            {
                name: "매도수량",
                type: "area",
                data: rows.map((row) => {
                    return { x: row.created_at, y: row.sell_quantify };
                }),
            },
        ];
    });

    hideSeries() {
        ApexCharts.exec("stock", "hideSeries", "매수금액");
        ApexCharts.exec("stock", "hideSeries", "매도금액");
    }

    componentDidUpdate() {
        this.resetYAxis();
        this.hideSeries();
    }

    render() {
        const { stats } = this.props;
        const series: any[] = this.computeSeries(stats);
        const seriesVolume: any[] = this.computeSeriesVolume(stats);

        return (
            <section className={Style.chartWrap}>
                {series.length === 0 ? (
                    <div>차트 데이터 가져오는중...</div>
                ) : (<>
                    <div>
                        <Chart
                            options={this.state.options}
                            series={series}
                            type="line"
                            width="100%"
                            height="500"
                        />
                    </div>
                    <div>
                        <Chart
                            options={this.state.optionsVolume}
                            series={seriesVolume}
                            type="area"
                            width="100%"
                            height="150"
                        />
                    </div>
                </>)}
            </section>
        );
    }
}