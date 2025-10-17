interface ButtonProps {
    name: string,
    color: string,
    bg: string,
    borderColor: string,
    onClick: () => void
}

export default function Button(props: ButtonProps) {
    return (
        <a onClick={props.onClick}
            className={`py-[9px] px-[16px] text-[16px] text-white rounded-[12px] self-start cursor-pointer`}
            style={{backgroundColor: props.bg, color: props.color, border: `1px solid ${props.borderColor}`}}
        >
            {props.name}
        </a>
    )
}