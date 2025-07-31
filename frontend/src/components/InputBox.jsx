import React from "react"
export function  InputBox({label , placeholder ,onChange}){
    return <div>
        <div className = "font-medium text-sm py-1.5">{label}</div>
        <input placeholder={placeholder} onChange={onChange} className="rounded py-1 text-sm w-full px-2 border" />
    </div>
}