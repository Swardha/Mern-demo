import React from 'react'
import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateProduct = () => {
    const [name,setName] = React.useState('');
    const [price,setPrice] = React.useState('');
    const [category,setCategory] = React.useState('');
    const [company,setCompany] = React.useState('');
    const params = useParams();
    const navigate = useNavigate();

    useEffect(()=>{
    
      getProductDetails();

    },[])

    const getProductDetails=async()=>{
      console.log(params);
      let result =await fetch(`http://localhost:5000/product/${params.id}`,{
        headers:{
          authorization:`bearer ${JSON.parse(localStorage.getItem('token'))} `
        }
      })
      result =await result.json();
      setName(result.name);
      setPrice(result.price);
      setCategory(result.category);
      setCompany(result.company)
    }

    const updateProduct=async()=>{
        console.log(name,price,category,company)
        let result = fetch(`http://localhost:5000/product/${params.id}`,{
          method:"Put",
          body:JSON.stringify({name, price, category, company}),
          headers:{
            'Content-Type':'application/json',
            authorization:`bearer ${JSON.parse(localStorage.getItem('token'))} `
          }
        })

        result= await result.json();
        console.log(result);
        navigate("/");

   
    }
  return (
    <div className="product">
        <h1>Update product</h1>
        <input type="text" placeholder='enter product name' 
        className='inputBox' onChange={(e)=>{setName(e.target.value)}} value={name} />
        

          <input type="text" placeholder='enter product price' 
         className='inputBox' onChange={(e)=>{setPrice(e.target.value)}} value={price} />
         

          <input type="text" placeholder='enter product category' 
         className='inputBox' onChange={(e)=>{setCategory(e.target.value)}} value={category} />
          

          <input type="text" placeholder='enter product company' 
         className='inputBox' onChange={(e)=>{setCompany(e.target.value)}} value={company} />

        <button className='button' onClick={updateProduct} >Update product</button>
      
    </div>
  )
}

export default UpdateProduct

