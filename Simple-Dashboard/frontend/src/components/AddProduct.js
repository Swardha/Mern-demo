import React from 'react'

const AddProduct = () => {
    const [name,setName] = React.useState('');
    const [price,setPrice] = React.useState('');
    const [category,setCategory] = React.useState('');
    const [company,setCompany] = React.useState('');
    const [error, setError]= React.useState(false)
    const addProduct=async()=>{

        console.log(!name)
        if(!name || !price || !category || !company){
            setError(true);
            return false;
        }

        console.log(name,price,category,company);
        const userId= JSON.parse(localStorage.getItem('user'))._id;
        let result= await fetch("http://localhost:5000/add-product",{
            method:"post",
            body:JSON.stringify({name,price,category,company,userId}),
            headers:{
                'Content-Type':'application/json',
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))} `
              }
        })
        result = await result.json();
        console.log(result)
    }
  return (
    <div className="product">
        <h1>add product</h1>
        <input type="text" placeholder='enter product name' 
        className='inputBox' onChange={(e)=>{setName(e.target.value)}} value={name} />
        { error && !name &&<span className='invalid'>Enter valid name</span>}

          <input type="text" placeholder='enter product price' 
         className='inputBox' onChange={(e)=>{setPrice(e.target.value)}} value={price} />
          { error && !price &&<span className='invalid'>Enter valid price</span>}

          <input type="text" placeholder='enter product category' 
         className='inputBox' onChange={(e)=>{setCategory(e.target.value)}} value={category} />
          { error && !category &&<span className='invalid'>Enter valid category</span>}

          <input type="text" placeholder='enter product company' 
         className='inputBox' onChange={(e)=>{setCompany(e.target.value)}} value={company} />
          { error && !company &&<span className='invalid'>Enter valid company</span>}

        <button className='button' onClick={addProduct} >Add product</button>
      
    </div>
  )
}

export default AddProduct
