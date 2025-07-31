import React from "react"
import { useState } from "react"
import axios from "axios"
import { useSearchParams } from "react-router-dom";

export function  SendMoney(){

    const [amount,setAmount]=useState(0);
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id")
    const name = searchParams.get("name")

    return (
        <div className="bg-violet-300 h-screen flex justify-center">
            <div className="flex flex-col justify-center">
                <div className=" bg-white">
                    <div className="font-bold text-2xl mt-5 w-100 text-center">Send Money</div>
                    <div className="mx-8 my-10">
                        <div className="flex mt-2">
                            <div className="rounded-full bg-green-400  h-12 w-12 flex justify-center mr-2">
                                <div className="flex flex-col text-white justify-center h-full">{name[0].toUpperCase()}</div>
                            </div>
                            <div className="flex flex-col font-medium justify-center">{name}</div>
                        </div>
                        <div className="text-sm mt-5">
                            Amount (in Rs)
                        </div>
                        <input type="text" onChange={(e)=>{
                            setAmount(e.target.value);
                        }} placeholder="Enter amount" className=" border mt-2 rounded px-2 border-gray-400 w-full "></input>
                        <button onClick={()=>{
                            console.log("Sending transfer:", { toId: id, amount: Number(amount) });

                            axios.post("http://localhost:3000/api/v1/account/transfer",{
                                toId : id,
                                amount : Number(amount)
                            },{
                                headers : {
                                    Authorization : "Bearer "+localStorage.getItem("token")
                                }
                            }).then((response)=>{
                                alert(response.data.message);
                            }).catch(()=>{
                                alert("Invalid account or insufficient balance")
                            }) 
                        }} disabled={!amount} className="text-center bg-green-500 rounded mt-3 w-full text-white p-1">Initiate Transfer</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
