import IDetailResult from "./interfaces/api/IDetailResult";
import { IMarketAnalysisResult } from "./interfaces/api/IMarketAnalysisResult";
import IRankResult from "./interfaces/api/IRankResult";

export async function fetcher<T>(input: RequestInfo, init?: RequestInit): Promise<T> {
    const response = await fetch(input, init);

    if (!response.ok) {
        throw response;
    }

    return response.json() as Promise<T>;
}

export async function getRank(type: string): Promise<IRankResult> {
    return await fetcher<IRankResult>(`/api/stock_analysis/ranks/${type}/`);
}

export async function getDetail(isin: string): Promise<IDetailResult> {
    return await fetcher<IDetailResult>(`/api/stock_analysis/${isin}`);
}

export async function getMarketAnalysis(base_date?: string, diff_date?: string): Promise<IMarketAnalysisResult> {
    let params = new URLSearchParams();
    if ( base_date !== undefined ) {
        params.set("base_date", base_date);
    }
    if ( diff_date !== undefined ) {
        params.set("diff_date", diff_date);
    }
    
    return await fetcher<IMarketAnalysisResult>(`/api/market_analysis/?` + params);
}