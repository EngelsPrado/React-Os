import React,{useEffect,useState,Fragment,useReducer} from 'react'
import './style.css'
import { auth, signOut, firestore } from '../firebase'
import Folder from './Folder&File/Folder'
import File from './Folder&File/File'
import Nav from './Barra'
import Login from './Login/Login'
import SidebarExampleSidebar from './SideBar'



const Side =({user})=>{

   const [folder,setFolder]=useState(null)
   const [file,setFile]=useState(null)
 

   useEffect(()=>{
    
   
     if (user){
        firestore.collection("desktop").doc(user&&user.uid).collection("folders").onSnapshot(el=>{
         setFolder(el.docs)
        
      })
      firestore.collection("desktop").doc(user&&user.uid).collection("files").where("state","==",true).onSnapshot(el=>{
        setFile(el.docs)
       
     })
     }
    
     
    
   },[user])

    return (
      <Fragment>
       {
         user?  <div class="page-wrapper chiller-theme toggled">
         {/* <button onClick={() => dispatch({ type: 'copy',ref:'423423423' })}>dispatch</button> */}
        <SidebarExampleSidebar >
        <main class="container">
           
           {folder && folder.map(el=>{
              
              return <Folder name={el.data().name} id={el.data().id } author={el.data().author}></Folder>
           })}
           {
             file && file.map(el=>{
              
               return <File name={el.data().name} id={el.data().id } author={el.data().author} folder=''></File>
            })
           }
        
          </main>

        </SidebarExampleSidebar>
        
       <Nav user={user}></Nav>
       </div>
        :<Login></Login> 
       }
      </Fragment>

    )
}


export default Side