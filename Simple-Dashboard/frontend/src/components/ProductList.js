import React from 'react'
import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom';

const ProductList = () => {
    const [products, setProducts] = useState([]);

    useEffect(()=>{
        getProducts();

    },[])

    const getProducts=async()=>{
        let result =await fetch('http://localhost:5000/products',{
          headers:{
            authorization:`bearer ${JSON.parse(localStorage.getItem('token'))} `
          }
        });
        result= await result.json();
        setProducts(result);
    }
    // console.log("products", products)

    const deleteProduct= async(id)=>{
        let result =await fetch(`http://localhost:5000/product/${id}`,{
            method:"Delete",
            headers:{
              authorization:`bearer ${JSON.parse(localStorage.getItem('token'))} `
            }
        })
        result =await result.json();
        if(result){
           getProducts()
        }
    }

    const searchHandle = async (e)=>{
      // console.log(e.target.value);
      let key = e.target.value;
      if(key){

        let result = await fetch(`http://localhost:5000/search/${key}`, {
          headers:{
            authorization:`bearer ${JSON.parse(localStorage.getItem('token'))} `
          }
        });
      result = await result.json();
      if(result){
        setProducts(result)
      }
      }else{
        getProducts();
      }
      
    }


  return (
    <div className="product-list">
      <h2>Product-list</h2>
      <input type="text" placeholder='search product' className="search"
      onChange={searchHandle} />
      <ul>
        <li>Sr.No</li>
        <li>Name</li>
        <li>Price</li>
        <li>Category</li>
        <li>Operation</li>
      </ul>

      {
        products.length>0 ? products.map((item, index)=>
        <ul key={item._id}>
        <li>{index+1}</li>
        <li>{item.name}</li>
        <li>${item.price}</li>
        <li>{item.category} </li>
        <li>
            <button onClick={()=>deleteProduct(item._id)} >Delete</button>
            <NavLink to={"/update/"+item._id}>Update</NavLink>
            </li>
      </ul>
        )
        :
        <h1>No result found</h1>
      }

    </div>
  )
}

export default ProductList
