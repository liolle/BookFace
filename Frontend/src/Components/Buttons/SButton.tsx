import React from "react"

type buttonProps = {
    text: string,
    activeButton: string,
    setActiveButton: React.Dispatch<React.SetStateAction<string>>
}

export const S_BUTTON = ({ text, activeButton, setActiveButton }: buttonProps) => {

    let font_size = text == activeButton ? 'font-bold' : 'font-light '
    let color = text == activeButton ? 'text-green-700' : 'text-neutral-700'
    let border_bottom = text == activeButton ? ' border-b-4 rounded-b-sm border-green-700' : ''

    return (
        <button className={`flex justify-center items-center h-[75%] ${color} ${font_size}
          select-none cursor-pointer rounded-t-md p-2 ${border_bottom}`}
            onClick={() => setActiveButton(text)}>
            {text}
        </button>
    )
}