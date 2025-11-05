interface ButtonProps {
    name: string,
    color: string,
    bg: string,
    borderColor: string,
    onClick: () => void,
    borderRadius?: number,
    px?: string,
    py?: string,
}

export default function Button(props: ButtonProps) {
    return (
        <a onClick={props.onClick}
            className={`${props.px ? props.px : "px-[16px]"} ${props.py ? props.py : "py-[9px]"} text-[16px] text-white rounded-[12px] cursor-pointer`}
            style={{
                backgroundColor: props.bg, color: props.color, border: `1px solid ${props.borderColor}`,
                borderRadius: props.borderRadius != null ? props.borderRadius : 12
            }}
        >
            {props.name}
        </a>
    )
}