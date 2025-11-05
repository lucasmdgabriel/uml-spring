interface HeaderProps {
    title: string,
    description: string
}

export default function Header(props: HeaderProps) {
    return (
        <header className="flex flex-col">
            <a className="font-bold text-[30px]">{props.title}</a>
            <a className="text-[16px]">{props.description}</a>
        </header>
    )
}