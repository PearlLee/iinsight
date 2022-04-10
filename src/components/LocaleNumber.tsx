interface ILocaleNumberProps {
    children: number,
}

export default function LocaleNumber(props: ILocaleNumberProps) {
    return(<span>{props.children.toLocaleString()}</span>)
}
