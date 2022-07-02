import Detail from './StockAnalysis/Detail';
import BoardTable from './StockAnalysis/BoardTable';

interface IStockAnalysis {
    toggle: boolean;
    toggleBoard: (value: boolean) => void;
    media: string;
}

export default function StockAnalysis(props: IStockAnalysis) {
    const { toggle, toggleBoard, media } = props;

    return (<section className="container">
        <Detail />
        <BoardTable toggle={toggle} toggleBoard={toggleBoard} media={media} />
    </section>);
}