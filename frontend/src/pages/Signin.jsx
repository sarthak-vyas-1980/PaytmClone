import React from "react"
import {useState} from "react"
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import { Button } from "../components/Button";
import { BottomWarning } from "../components/BottomWarning";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export const Signin = ()=>{

    const [username , setUsername] = useState("");
    const [password , setPassword] = useState("");
    const navigate = useNavigate();

    return <div className="bg-violet-300 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
            <div className="rounded-lg bg-white h-max p-2 px-4 w-full">
                <Heading label="Sign in"></Heading>
                <SubHeading label={"Enter your credentials to access your account"} />
                <InputBox onChange={(e)=>{
                    setUsername(e.target.value);
                }} label={"Email"} placeholder={"Enter Email"}/>
                <InputBox onChange={(e)=>{
                    setPassword(e.target.value);
                }} label={"Password"} placeholder={"Enter Password"}/>
                <Button onClick={async ()=>{
                    const response =await axios.post("http://localhost:3000/api/v1/user/signin",{
                        username,
                        password
                    });
                    localStorage.setItem("token",response.data.token);
                    navigate("/dashboard") 
                }} label={"Sign in"}></Button>
                <BottomWarning label={"Don't have an account"} buttonText={"Sign up"} to="/signup"></BottomWarning>
            </div>
        </div>
    </div>
}