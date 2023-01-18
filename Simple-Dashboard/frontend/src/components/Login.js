import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

function Login() {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const navigate = useNavigate();
    useEffect(()=>{
        const auth = localStorage.getItem('user');
        if(auth){
            navigate("/");

        }
    },[])
    const handleLogin= async ()=>{
        console.log(email,password);
        let result = await fetch('http://localhost:5000/login',{
            method:'post',
            body:JSON.stringify({email, password}),
            headers:{
                'Content-Type':'application/json'
              }
        })
        result= await result.json();
        console.log(result);
        if(result.auth){
            localStorage.setItem("user", JSON.stringify(result.user))
            localStorage.setItem("token", JSON.stringify(result.auth))
            navigate("/");
        }else{
            alert("please enter correct credentials")
        }
    }
  return (
    <div className='login'>
      <h1>login page</h1>
      <input className='inputBox' type="text" placeholder='enter email' onChange={(e)=>setEmail(e.target.value)} 
      value={email} />
      <input className='inputBox' type="password" placeholder='enter password' onChange={(e)=>setPassword(e.target.value)}
      value={password} />
      <button className='button' onClick={handleLogin}  type="button">Login</button>
    </div>
  )
}

export default Login
