const backendUrl = import.meta.env.VITE_BACKEND_URL  

export const getUser = async () =>{
    try {
       const response = await fetch(backendUrl + 'users' )
       const data = await response.json()
       setUsers(data);       
    } catch (error) {
        console.log(error);
    }}

export const createUser = async (register, setData) =>{
    try {
        const response = await fetch(backendUrl  + 'register', 
            {method:'POST',
             body:JSON.stringify({
                'email': register.email,
                'password' : register.password}),
             headers:{"Content-Type" : "application/json"}
            }) 
            const data = await response.json()
            setData(data);
                
    } catch (error) {
        console.log(error.status);
        }}


export const loginUser = async (login, navigate, setData) =>{
    try {
        const response = await fetch(backendUrl  + 'login', 
            {method:'POST',
             body:JSON.stringify({
                'email': login.email,
                'password' : login.password}),
             headers:{"Content-Type" : "application/json"}
            }); 
        const data = await response.json()
        const token = data.token
        sessionStorage.setItem("token", token)
        if(data.token){
            navigate('/protected')
        }
        setData(data)

    } catch (error) {
        console.log(error);
    }
}

export const privateUser = async (setData) => {
    try {
        const token = sessionStorage.getItem('token')
        const response = await fetch(backendUrl + 'private', {
            method: 'GET',
            headers: {'Content-Type' : 'application/json',
                     'Authorization' : `Bearer ${token}`
            },
        })
        const data = await response.json()
        setData(data) 
        if(response.ok){
            return true
        }else {return false}
        
    } catch (error) {
        console.log(error); 
    }
}




