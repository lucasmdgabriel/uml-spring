import { error } from "console"

interface InputProps {
    name: string,
    placeHolder: string,
    value: string,
    error: string,
    changeValue: (newValue: string) => void
}

export default function Input(props: InputProps) {
    return (
        <div className="flex flex-col w-[100%] gap-[4px]">
            <a className="text-[16px]">{props.name}</a>
            <input
                value={props.value}
                placeholder={props.placeHolder}
                className="h-[40px] font-[16px] pl-[13px] bg-[#F5F7F8] border border-[#CBD5E1] rounded-[12px]"
                onChange={(e) => props.changeValue(e.target.value)}
            />
            <a className="pl-1 text-[#ff0000] font-bold text-[14px]">{props.error}</a>
        </div>
    )
}