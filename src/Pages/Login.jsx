import React, { useContext, useState } from "react";
import { AdminContext } from "../Context/AdminContext";
import axios from "axios";
import { toast } from "react-toastify";
import { data } from "react-router-dom";


const Login = () => {
  const [state, setState] = useState("Admin");
  const [email , setEmail] = useState("");
  const [password, setPassword ] = useState("")
  const  {setaToken, backendUrl } = useContext(AdminContext);

  const onSubmitHandler = async(e) =>{
    e.preventDefault();

    try {
        if(state ==="Admin"){
              const {data} = await axios.post(backendUrl+"/api/admin/login", {email, password})
              if(data.success){
                localStorage.setItem("aToken", data.token)
                setaToken(data.token)
                
              }else{
                toast.error(data.message)
              }

        } else{
           
        }
        
    } catch (error) {
        
    }

  }


  return (
    <form  onSubmit={onSubmitHandler}  action="" className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-lg p-6 sm:p-8 md:p-10 lg:p-12 w-full max-w-md">
        <p className="text-xl sm:text-2xl font-semibold text-gray-800 text-center mb-6">
          <span className="text-blue-600">{state}</span> Login
        </p>
        <div className="mb-4">
          <p className="block text-gray-700 font-medium mb-1">Email</p>
          <input   onChange={(e)=>{setEmail(e.target.value)}}  value = {email}
            type="email"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>
        <div className="mb-6">
          <p className="block text-gray-700 font-medium mb-1">Password</p>
          <input   onChange={(e)=>{setPassword(e.target.value)}}  value = {password}
            type="password"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>
        <button
          className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition duration-300"
        >
          Login
        </button>
        {
            state==="Admin"?
            <p>Doctor Login <span onClick={()=>{setState("Doctor")}}>Click here </span></p>:<p>Admin Login <span onClick={()=>{setState("Admin")}}>Click here </span></p>
        }
      </div>
    </form>
  );
};

export default Login;
