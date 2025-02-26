import { useState } from "react";
import { createUser } from "../conectionApi/apiservice";


export const NewUser = () => {
  // Access the global state and dispatch function using the useGlobalReducer hook.
  const [ register, setRegister ] = useState()
  const [data, setData] = useState({})
   
  const handleChange = (e) =>{
    setRegister({...register, [e.target.name]: e.target.value})
  }

  return (
    <main className="container_form">
      <header className="form_header">
        <h3>Create a User</h3>
      </header>
      <form className="form_contact">
        {data.msg && <p style={{color: 'red'}}>{data.msg}</p>}
        <label className="form_label" htmlFor="email">Email:</label>
        <input className="form_input" required type="email" name="email" onChange={(e)=>handleChange(e)}/>

        <label className="form_label" htmlFor="password">Password:</label>
        <input className="form_input" required type="text" name="password" onChange={(e)=>handleChange(e)}/>
      </form>
      <footer>
        <button type="submit" onClick={()=>createUser(register, setData)}>Register</button>
      </footer>
    </main>
  );
};
