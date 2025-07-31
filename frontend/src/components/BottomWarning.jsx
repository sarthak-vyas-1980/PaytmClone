import { Link } from "react-router-dom"
import React from "react"

export function  BottomWarning({label , buttonText ,to}){
    return <div className="text-gray-700 text-sm flex justify-center">
        <div> {label} </div>
        <Link className=" pointer cursor-pointer pl-2 underline" to={to}>
            {buttonText}
        </Link>
    </div>    
}