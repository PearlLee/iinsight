import { rows } from '../../stockData';
import DetailHeader from './DetailHeader';
import DetailChart from './DetailChart';

interface IDetailProps {
    isin: string;
}
export default function Detail(props: IDetailProps) {
    const row = rows.find((item) => item.info.isin === props.isin);

    return(<section className="detailContainer">
        {row === undefined && 
            <p>데이터 없음</p>
        }
        {row !== undefined &&
            <>
                <DetailHeader isin={props.isin} />
                <DetailChart />
            </>
        }
    </section>);
};
