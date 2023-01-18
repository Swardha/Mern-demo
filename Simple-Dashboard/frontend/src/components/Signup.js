import React, {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
const Signup = () => {
    const [name, setName]= useState("");
    const [password, setPassword]= useState("");
    const [email, setEmail]= useState("");
    const navigate= useNavigate();
   
    useEffect(()=>{
        const auth = localStorage.getItem('user');
        if(auth){
            navigate('/')
        }
    })



    const collectData=async ()=>{
        console.log(name, email, password);
        let result =await fetch('http://localhost:5000/register',{
          method:'post',
          body: JSON.stringify({name, email, password}),
          headers:{
            'Content-Type':'application/json'
          }
        });
        result= await result.json()
        console.log(result);
        localStorage.setItem("user", JSON.stringify(result.result));
        localStorage.setItem("token", JSON.stringify(result.auth));
        if(result)
        {
          navigate('/')
         
        }
    }
  return (
    <div className='reg'>
      <h1>register</h1>
      <input className='inputBox' type="text" value={name} placeholder='enter name' onChange={(e)=>setName(e.target.value)}/>
      <input className='inputBox' type="text" value={email} placeholder='enter email' onChange={(e)=>setEmail(e.target.value)}/>
      <input className='inputBox' type="password" value={password} placeholder='enter password' onChange={(e)=>setPassword(e.target.value)}/>
      <button className='button' onClick={collectData} type="button">Signup</button>
    </div>
  )
}

export default Signup
