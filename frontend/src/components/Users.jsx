import React, { useEffect } from "react";
import {useState} from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom";

export function Users (){
    
    const [filter , setFilter] = useState("");
    const [users , setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(()=>{
        axios.get(`http://localhost:3000/api/v1/user/bulk?filter=${filter}`)
        .then((response)=>{
            setUsers(response.data.users);
        })
    },[filter]);
    
    return(
        <div className="mr-8 mt-5 ">
            <div>Users</div>
            <input type="text" onChange={(e)=>{
                setFilter(e.target.value);
            }} placeholder="Search users..." className="rounded border text-md font-medium px-2 py-1 mt-3 w-full border-slate-400" />
            {users.map((user)=>(
                <div className="flex justify-between mt-3 font-medium ">
                    <div className="flex">
                        <div className="rounded-full bg-slate-200 h-12 w-12 flex justify-center mr-2">
                            <div className="flex flex-col justify-center h-full">{user.firstName[0]} </div>
                        </div>
                        { <div className="flex flex-col justify-center">{user.firstName} {user.lastName}</div> }
                    </div>
                    <button onClick={()=>{
                        navigate(`/send?id=${user._id}&name=${user.firstName}`);
                    }} className="px-3 text-white rounded-md bg-blue-950 flex flex-col justify-center">Send Money</button>
                </div>
            ))}
        </div>
    )
}