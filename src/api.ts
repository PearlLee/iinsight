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
