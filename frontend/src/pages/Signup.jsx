import React from "react"
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import { Button } from "../components/Button";
import { BottomWarning } from "../components/BottomWarning";
import { useNavigate } from "react-router-dom";
import {useState} from "react"
import axios from "axios"


export const Signup = ()=>{

    const [firstName , setFirstName] = useState("");
    const [lastName , setLastName] = useState("");
    const [username , setUsername] = useState("");
    const [password , setPassword] = useState("");
    const navigate = useNavigate();

    return <div className="bg-violet-300 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
            <div className="rounded-lg bg-white h-max p-2 px-4 w-full">
                <Heading label="Sign up"></Heading>
                <SubHeading label={"Enter your information to create an account"} />
                <InputBox onChange={(e)=>{
                    setFirstName(e.target.value);
                }} label={"First Name"} placeholder={"Enter First Name"}/>
                <InputBox onChange={(e)=>{
                    setLastName(e.target.value);
                }} label={"Last Name"} placeholder={"Enter Last Name"}/>
                <InputBox onChange={(e)=>{
                    setUsername(e.target.value);
                }} label={"Email"} placeholder={"Enter Email"}/>
                <InputBox onChange={(e)=>{
                    setPassword(e.target.value);
                }} label={"Password"} placeholder={"Enter Password"}/>
                <div clasName="flex justify-items-center">
                    <Button onClick={()=>{
                        axios.post("http://localhost:3000/api/v1/user/signup",{
                            username,
                            password,
                            firstName,
                            lastName
                        })
                        .then((response) => {
                            alert(response.data.message); // "user created successfully"
                            localStorage.setItem("token", response.data.token);
                            navigate("/dashboard");
                        })
                        .catch((error) => {
                        console.error("Signup error:", error);
                        alert(error.response?.data?.msg || "Signup failed");
                        });
                        localStorage.setItem("token",response.data.token);  //storing token in localStorage as key value pair
                    }} label={"Sign up"}></Button>
                </div>
                <BottomWarning label={"Already have an account"} buttonText={"Sign in"} to="/signin"></BottomWarning>
            </div>
        </div>
    </div>
}