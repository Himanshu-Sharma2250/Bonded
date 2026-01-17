import React from 'react'

const Button = (props) => {
    return (
        <div>
            <button className={`px-4 py-1 bg-[#${props.bgColor}] cursor-pointer rounded-xs text-[#F8FAFC] text-[${props.btnSize}] font-medium`}>
                {props.name}
            </button>
        </div>
    )
}

export default Button;