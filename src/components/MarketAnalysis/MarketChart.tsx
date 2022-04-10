import { Component } from "react";
import Chart from "react-apexcharts";

import IMarketAnalysisData from "../../interfaces/IMarketAnalysisData";
import Style from '../../styles/market.module.scss';

interface ViewProps {
    stats: IMarketAnalysisData[];
}

interface ViewState {
    options: ApexCharts.ApexOptions;
}

class MarketChartView extends Component<ViewProps, ViewState> {
    constructor(props: ViewProps) {
        super(props);

        this.state = this.createState();
    }

    createState(): ViewState {
        const options: ApexCharts.ApexOptions = {
            chart: {
                height: 500,
                type: "treemap",
            },
            dataLabels: {
                enabled: true,
                style: {
                    fontSize: "14px",
                },
                formatter: function (x: number, op: any): string[] {
                    let seriesData = op.w.config.series[op.seriesIndex].data[op.dataPointIndex];
                    let change_percent = seriesData.change_percent;
                    return [x.toString(), (change_percent > 0 ? "+" : "") + change_percent.toFixed(2) + "%"];
                } as any,
            },
            tooltip: {
                custom: function ({ series, seriesIndex, dataPointIndex, w }) {
                    let seriesData = w.config.series[seriesIndex].data[dataPointIndex];
                    let change_percent = seriesData.change_percent;

                    return `<div class="arrow_box"><span>${seriesData.stockinfo.name}(${
                        seriesData.stockinfo.ticker
                    })<br/>${(change_percent > 0 ? "+" : "") + change_percent.toFixed(2) + "%"}</div>`;
                },
            },
            plotOptions: {
                treemap: {
                    distributed: true,
                    enableShades: false,
                },
            },
        };

        return {
            options,
        };
    }

    computeSeries = (stats: IMarketAnalysisData[]) => {
        if (stats == null) {
            return [];
        }

        return [
            {
                data: stats.map((row: IMarketAnalysisData) => {
                    return {
                        x: row.stockinfo.ticker || row.stockinfo.name,
                        y: row.hold_amount,
                        ...row,
                    };
                }),
            },
        ];
    }

    render() {
        const { stats } = this.props;
        const series: any[] = this.computeSeries(stats);

        return (
            <section className={Style.chart}>
                {series.length === 0 ? (
                    <div>차트 데이터 가져오는중...</div>
                ) : (
                    <div>
                        <div>
                            <Chart
                                options={this.state.options}
                                series={series}
                                type="treemap"
                                width="100%"
                                height="600"
                            />
                        </div>
                    </div>
                )}
            </section>
        );
    }
}

export default function MarketChart(props: ViewProps) {
    return (
        <MarketChartView {...props} />
    );
};

