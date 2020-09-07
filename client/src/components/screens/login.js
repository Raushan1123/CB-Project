import React,{useState,useContext} from 'react'
import {Link,useHistory }  from 'react-router-dom'
import {UserContext} from '../../App'
import M from 'materialize-css'

const Login = ()=>{
    const {state,dispatch} = useContext(UserContext)
    const history = useHistory()
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const PostData = ()=>{
        if(!(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(email)){
            return M.toast({html: 'Invalid Email',classes:"#c62828 red-darken-3"})
        }
        fetch("/signin",{
            method:"post",
            headers:{
                "content-Type":"application/json",
                'Accept': 'application/json'
            },
            body:JSON.stringify({
                password,
                email
        })
        }).then(res=>res.json())
        .then(data=>{
            console.log(data)
            if(data.error){
                M.toast({html: 'data.error',classes:"#c62828 red-darken-3"})
            }
            else{
                localStorage.setItem("jwt",data.token)
                localStorage.setItem("user",JSON.stringify(data.user))
                dispatch({type:"USER",payload:data.user})
                M.toast({html:'Login Success',classes:"#43a047 green darken-1"})
                history.push('/')
            }
        }).catch(err=>{
            console.log(err)
        })
    }
    return(
        <section className="sec" style={{height:"100vh",width:"80%",marginLeft:"10em"}}>
       <div className="mycard">
           <div className="card auth-card input-field">
               <h2>Navyagram</h2>
               <input
               type="text"
               placeholder="Email"
               value={email}
               onChange={(e)=>setEmail(e.target.value)}
               />
               <input
               type="password"
               placeholder="Password"
               value={password}
               onChange={(e)=>setPassword(e.target.value)}
               />
               <button className="btn waves-effect waves-light" 
               onClick={()=>PostData()}>
                   Login
               </button>
               <h5>
                   <Link to="/signup">Create an account?</Link>
               </h5>
           </div>
       </div>
       </section>
    )
}

export default Login