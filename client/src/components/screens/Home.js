import React,{useState,useEffect} from 'react'
import {Link,useHistory }  from 'react-router-dom'
import M from 'materialize-css'


const Home = ()=>{
    const [data,setData] = useState([])
    useEffect(()=>{
        fetch('/allpost',{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            console.log(data)
            setData(result.posts)
        })
    },[])
    return(
       <div className="home">
           {
               data.map(item=>{
                   return(
                    <div className="card home-card" key={item._id}>
                    <h5>{item.name}</h5>
                    <div className="card-image">
                    <img style={{width:"100%",height:"350px"}}
                    // src={require(item.photo)}
                      src={require("./images/pic-1.jpg")}
                      alt="Profile img"/>
                    </div>
                    <div className="card-content">
                    <i className="material-icons" style={{color:"red"}}>favorite</i>
                   <h6>{item.title}</h6>
                   <p>{item.body}</p>
                        <input type="text" placeholder="Add a comment"/>
                    </div>
                </div>
                   )
               })
            }  
            </div>
          
    )
}

export default Home