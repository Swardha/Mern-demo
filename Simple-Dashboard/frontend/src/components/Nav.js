
import {  NavLink, useNavigate} from "react-router-dom";

const Nav=()=>{
    const auth = localStorage.getItem('user');
    const navigate = useNavigate();
    const logout = ()=>{
        console.log("apple");
        localStorage.clear();
        navigate('/signup')
    }
 
    return(
        <div>
         <img alt="logo" className="logo"
         src='https://play-lh.googleusercontent.com/DTzWtkxfnKwFO3ruybY1SKjJQnLYeuK3KmQmwV5OQ3dULr5iXxeEtzBLceultrKTIUTr' />
       
       { auth ? <ul className="nav-ul">
      
            <li><NavLink to="/" >Products</NavLink></li>
            <li><NavLink to="/add" >Add Products</NavLink></li>
            <li><NavLink to="/update" >Update Products</NavLink></li>
            <li><NavLink to="/profile" >Profile</NavLink></li>
            <li>  <NavLink to="/signup" onClick={logout} >Logout({JSON.parse(auth).name}) </NavLink></li>
          
            
        </ul> 
        : 
        <ul className="nav-ul nav-right">
            <li>  <NavLink to="/signup" >Signup</NavLink></li>
            <li><NavLink to="/login" >Login</NavLink></li>
        </ul>
}
    
        </div>
    )
}


export default Nav;