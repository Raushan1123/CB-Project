import React,{useEffect,useState, useContext} from 'react'
import { UserContext } from '../../App'
import {useParams} from 'react-router-dom'


const Profile = ()=>{
    const [userProfile,setProfile] = useState(null)
    const {state,dispatch} = useContext(UserContext)
    const {userId} = useParams()

    useEffect(()=>{
        fetch('/user/${userId}',{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        })
            .then(res=>res.json())
            .then(result=>{
                console.log(result)
                setProfile(result)
            })
      
    },[])
    return(
        <>
        {
            userProfile?
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
                    <h4>{userProfile.user.name}</h4>
                    <h5>{userProfile.user.email}</h5>
                <div style={{display:"flex",justifyContent:"space-between",width:"108%"}}>
                    <h6>{userProfile.posts.length} posts</h6>
                    <h6>40 followers</h6>
                    <h6>40 following</h6>
                </div>
                </div>
            </div>
            <div className="gallery">
                {
                    userProfile.posts.map(item=>{
                        return(
                            <img key={item._id} className="item" src={item.photo} alt={item.title}/>
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

            :<h2>loading...!</h2>
        }
        
        </>
        )
}

export default Profile