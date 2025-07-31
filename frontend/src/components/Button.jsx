import React from "react"
export function  Button({label , onClick}){
    return <button onClick={onClick} className="ml-23 py-2 bg-blue-950 rounded-md text-white mt-4 mb-3 px-10">
        {label}
    </button>
}