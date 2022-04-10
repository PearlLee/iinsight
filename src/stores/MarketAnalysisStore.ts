import { makeAutoObservable, runInAction, observable } from "mobx";
import { getMarketAnalysis } from "../api";
import IMarketAnalysisData from "../interfaces/IMarketAnalysisData";

export default class MarketAnalysisStore {
    data: IMarketAnalysisData[];
    base_date: string;
    diff_date: string;

    constructor() {
        this.data = [];
        this.base_date = "";
        this.diff_date = "";

        makeAutoObservable(this, { data: observable.shallow });
        this.fetch();
    }

    async fetch(base_date?: string, diff_date?:string) {
        const marketResult = await getMarketAnalysis(base_date, diff_date);

        runInAction(() => {
            this.data = marketResult.result.map((element) => {
                return {
                    change_point: element.hold_amount - element.diff_hold_amount,
                    change_percent: (element.hold_amount - element.diff_hold_amount) / element.hold_amount * 100,
                    ...element
                };
            });

            this.base_date = marketResult.base_date;
            this.diff_date = marketResult.diff_date;
        });
    }
}
