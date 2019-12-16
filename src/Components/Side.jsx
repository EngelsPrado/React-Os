import React,{useEffect,useState,Fragment,useReducer,useContext} from 'react'
import './style.css'
import { auth, signOut, firestore } from '../firebase'
import Folder from './Folder&File/Folder'
import File from './Folder&File/File'
import Nav from './Barra'
import Login from './Login/Login'
import SidebarExampleSidebar from './SideBar'
import {UserContext} from './../Providers/UserProvider'


const Side =({user})=>{

   const [folder,setFolder]=useState(null)
   const [file,setFile]=useState(null)
   const [fondo,setFondo]=useState('')
   const [,dni,dispatch] = useContext(UserContext)
   
   useEffect(()=>{
    
   
     if (user){
        firestore.collection("desktop").doc(user&&user.uid).collection("folders").where("dir",'==','parent').onSnapshot(el=>{
         setFolder(el.docs)
        
      })
      firestore.collection("desktop").doc(user&&user.uid).collection("files").where("state","==",true).onSnapshot(el=>{
        setFile(el.docs)
       
     })
     }
    
     
    
   },[user])


   useEffect(()=>{
   
    if(user){
      firestore.collection("desktop").doc(user.uid).collection("fondo").doc(user.uid).onSnapshot(fondo=>{
        setFondo(fondo.data().url)
    })
    }

   },[user])

    return (
      <Fragment>
       {
         user?  <div class="page-wrapper chiller-theme toggled animated  pulse delay-0.1s">
         {/* <button onClick={() => dispatch({ type: 'copy',ref:'423423423' })}>dispatch</button> */}
        <SidebarExampleSidebar user={user}>
        <main class="home-bg"  style={{
        backgroundImage: 'url(' + fondo + ')',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment:'fixed',
        backgroundSize:'cover' 
        
      }}>
           
           {folder && folder.map(el=>{
              
              return <Folder name={el.data().name} id={el.data().id } author={el.data().author} to=''></Folder>
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