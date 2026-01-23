import React from 'react'

const Button = (props) => {
    return (
        <div>
            <button className={`px-4 py-1 cursor-pointer rounded-xs text-[#F8FAFC] font-medium`} style={{ backgroundColor: props.bgColor, fontSize: props.btnSize }}>
                {props.name}
            </button>
        </div>
    )
}

export default Button;