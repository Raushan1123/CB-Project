import React,{useEffect,useState, useContext} from 'react'
import { UserContext } from '../../App'


const Profile = ()=>{
    const [mypics,setPics] = useState([])
    const {state,dispatch} = useContext(UserContext)
    useEffect(()=>{
        fetch('/mypost',{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }.then(res=>res.json())
            .then(result=>{
                setPics(result.myposts)
            })
        })
    },[])
    return(
        
        <div style={{maxWidth:"950px",margin:"0px auto"}}>
            <div style={{

                display:"flex",
                justifyContent:"space-around",
                margin:"18px 0px",
                borderBottom:"1px solid grey"
            }}>
                <div>
                    <img style={{width:"160px",height:"160px",borderRadius:"80px"}}
                 src={require("./images/pic-1.jpg")}
                 alt="Profile img"/>
                </div>
                <div>
        <h4>{state?state.name:"loading"}</h4>
                <div style={{display:"flex",justifyContent:"space-between",width:"108%"}}>
                    <h6>40 Posts</h6>
                    <h6>40 followers</h6>
                    <h6>40 following</h6>
                </div>
                </div>
            </div>
            <div className="gallery">
                {
                    mypics.map(item=>{
                        return(
                            <img key={item._id} className="item" src={item.photo} alt=""/>
                        )
                    })
//                 <img className="item" alt="Profile img" src={require("./images/pic-2.jpg")}/>
//                 <img className="item" alt="Profile img" src={require("./images/pic-3.jpg")}/>
//                 <img className="item" alt="Profile img" src={require("./images/pic-4.jpg")}/>
//                 <img className="item" alt="Profile img"    src={require("./images/pic-5.jpg")}/>
//                 <img className="item" alt="Profile img"    src={require("./images/pic-6.jpg")}/>
//                 <img className="item" alt="Profile img"    src={require("./images/pic-6.jpg")}/>
// }
                }
                </div>     
        </div>
        )
}

export default Profile