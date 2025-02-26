import { useEffect, useState } from "react"
import { privateUser } from "../conectionApi/apiservice"
import { useNavigate } from "react-router-dom"

export const ViewProtected = () =>{
    const [isAuthenticated, setIsAuthenticated] = useState(null)
    const [data, setData] = useState({})
    const navigate = useNavigate()

    const logout = () =>{
        sessionStorage.removeItem('token')
        let storage = sessionStorage.getItem('token')
        if(!storage){
            navigate('/')
        }
    };
    

    useEffect(()=>{
        const checkout = async () =>{
            const authenticated = await privateUser(setData)
            if(!authenticated){
                navigate('/')
                return
            }
            setIsAuthenticated(true)
        }
        checkout()
    },[])   

    return (
        <>
            {
                isAuthenticated == null ? <p>Loading...</p> :
                <h1>Bienvenido <span style={{color: 'red'}}>{data.email}</span> a su area privada</h1>
            }

            <section>
                <button onClick={logout}>Logout</button>
            </section>
        </>
    )
}