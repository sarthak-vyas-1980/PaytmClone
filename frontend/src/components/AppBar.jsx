import React from "react"

export function AppBar(){
    return <div className="flex shadow font-medium h-14">
        <div className="flex flex-col justify-center h-full w-full ml-4">PayTM App</div>
        <div className="flex flex-col justify-center h-full mr-4">Hello</div>
        <div className="rounded-full bg-slate-200 h-12 w-12 flex justify-center mr-2">
            <div className="flex flex-col justify-center h-full text-bold">U</div>
        </div>

    </div>
}