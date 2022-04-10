import { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import StockAnalysisStore from "../stores/StockAnalysisStore";
import { StockAnalysisStoreProvider, useStockAnalysisStore } from "../providers/StockStoreProvider";
import Detail from './StockAnalysis/Detail';
import BoardTable from './StockAnalysis/BoardTable';

interface IStockAnalysis {
    toggle: boolean;
    toggleBoard: (value:boolean) => void;
    media: string;
}

function StockAnalysisView(props: IStockAnalysis) {
    const stockAnalysisStore = useStockAnalysisStore();
    const { toggle, toggleBoard, media } = props;
    const { isin } = useParams<{isin?: string}>();
    
    useEffect(() => {
        if ( isin !== undefined ) {
            stockAnalysisStore.setIsin(isin);
        }
    }, [isin, stockAnalysisStore]);


    return (<section className="container">
        <Detail />
        <BoardTable toggle={toggle} toggleBoard={toggleBoard} media={media} />
    </section>);
}

export default function StockAnalysis(props: IStockAnalysis) {
    const stockAnalysisStore = useMemo(() => new StockAnalysisStore(), []);

    return(<StockAnalysisStoreProvider store={stockAnalysisStore}>
        <StockAnalysisView {...props} />
    </StockAnalysisStoreProvider>);
}