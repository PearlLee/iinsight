interface IChangeProps {
    point: number,
    percent: number,
}

export default function Change(props: IChangeProps) {
    let sign:string = "";
    
    if (props.point < 0) {
        sign = "-";
    }
    else if (props.point > 0) {
        sign = "+";
    }

    const signStr: string = (
        sign === "+" ? "+" : ""
    );

    return(<span className="change" data-sign={sign}>
        {signStr}{props.point}
        <span className="percent">{signStr}{props.percent}%</span>
    </span>)
}
