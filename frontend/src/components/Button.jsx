import React from 'react'

const Button = ({ name, txtColor, bgColor, btnSize, ...rest }) => {
    return (
        <div>
            <button 
                {...rest}
                className={`px-4 py-1 cursor-pointer rounded-xs font-medium`} 
                style={{ backgroundColor: bgColor, fontSize: btnSize, color: txtColor ? txtColor : '#F8FAFC' }}
            >
                {name}
            </button>
        </div>
    )
}

export default Button;