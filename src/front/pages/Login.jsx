import { useState } from "react";
import { loginUser } from "../conectionApi/apiservice";
import { useNavigate } from "react-router-dom";



export const Login = () => {

  const [login, setLogin] = useState()
  const navigate = useNavigate()
  const [data, setData] = useState({});
  

  const handleChange = (e) =>{
    setLogin({...login, [e.target.name]: e.target.value})
  };

  const handleClick = () => {
    loginUser(login, navigate, setData);
  }

  return (
      <main className="container_form">
        <header className="form_header">
          <h2>Login</h2>
        </header>
        <form className="form_contact">

          {data.msg && <p style={{color: 'red'}}>{data.msg}</p>}
          <label className="form_label" htmlFor="email">Email:</label>
          <input className="form_input" type="email" name="email" onChange={(e)=>handleChange(e)}/>
  
          <label className="form_label" htmlFor="password">Password:</label>
          <input className="form_input" type="text" name="password" onChange={(e)=>handleChange(e)}/>
        </form>
        <footer>
          <button type="submit" onClick={handleClick}>Login</button>
        </footer>
        
      </main>
  );
};
