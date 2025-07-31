import React, { useEffect , useState } from "react"
import { AppBar } from "../components/AppBar"
import { Users } from "../components/Users"
import axios from "axios";

export function  Dashboard(){
    
    const [balance ,setBalance] = useState(0);

    useEffect(()=>{
        axios.get("http://localhost:3000/api/v1/account/balance",{
            headers : {
                Authorization : "Bearer "+localStorage.getItem("token")
            }
        }).then((bal)=>{
            setBalance(bal.data.balance);
        })
    },[])

    return <div>
        <AppBar></AppBar>
        <div className="pt-8 ml-8 text-md font-bold">
            <div>Your Balance Rs {balance}</div>
            <Users></Users>
        </div>
    </div>
}