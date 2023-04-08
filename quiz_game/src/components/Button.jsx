import React, { useCallback, useContext, useEffect, useState } from 'react'
import checked from '../assets/checked.png'
import close from '../assets/close.png'
import { SelectedContext } from '../context/Selected'

export const Button = ({ title, handle, index, correctAnswer }) => {
    const [isSelect, setSelect] = useState(null)
    const BgColor = (title === "True" ? " bg-blue-500 hover:bg-blue-600" : (title === "False" ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"))
    const { isSelected, selected } = useContext(SelectedContext)


    const validateAnswer = () => {
        if (selected.isSelect) return
        const isCorrect = correctAnswer === title
        setSelect(isCorrect)
        isSelected({ isSelect: true, isCorrect })
        setTimeout(() => {
            handle(title)
            setSelect(null)
        }, 1000)
    }

    return (
        <button
            className={`flex items-center w-2/5 text-white text-md font-semibold py-4 pl-5 m-2 ml-0 space-x-2 border-2 cursor-pointer bg-white/5 border-white/10 px-4 ${BgColor} rounded-md `}
            onClick={() => validateAnswer()}
        >
            {isSelect === true && (<span className="text-white text-sm font-bold rounded-full w-6 h-6 bg-black/10 mr-8 border-2 border-white" style={{ backgroundImage: `url(${checked})`, backgroundSize: "cover" }}></span>)}
            {isSelect === false && (<span className="text-white text-sm font-bold rounded-full w-6 h-6 bg-black/10 mr-8 border-2 border-white" style={{ backgroundImage: `url(${close})`, backgroundSize: "cover" }}></span>)}
            {isSelect === null && (<span className="text-black text-sm font-bold rounded-full w-6 h-6 bg-white mr-8 border-2 border-white">{index + 1}</span>)}
            {title}
        </button>
    )
}


export default Button