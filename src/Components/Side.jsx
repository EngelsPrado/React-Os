import React,{useEffect,useState,Fragment} from 'react'
import './style.css'

import { auth, signOut, firestore } from '../firebase'
import Folder from './Folder&File/Folder'
import File from './Folder&File/File'
import Nav from './Barra'
import Login from './Login/Login'


const Side =({user})=>{

   const [folder,setFolder]=useState(null)
   const [file,setFile]=useState(null)
   console.log(folder)
   console.log(file) 
   useEffect(()=>{
    
   
     if (user){
        firestore.collection("desktop").doc(user&&user.uid).collection("folders").onSnapshot(el=>{
         setFolder(el.docs)
        
      })
      firestore.collection("desktop").doc(user&&user.uid).collection("files").onSnapshot(el=>{
        setFile(el.docs)
       
     })
     }
    
     
    
   },[user])

    return (
      <Fragment>
       {
         user?  <div class="page-wrapper chiller-theme toggled">
         <a id="show-sidebar" class="btn btn-sm btn-dark" href="#">
           <i class="fas fa-bars"></i>
         </a>
         <nav id="sidebar" class="sidebar-wrapper">
           <div class="sidebar-content">
             <div class="sidebar-brand">
               <a href="#">pro sidebar</a>
               <div id="close-sidebar">
                 <i class="fas fa-times"></i>
               </div>
             </div>
             <div class="sidebar-header">
               <div class="user-pic">
                 <img class="img-responsive img-rounded" src="https://raw.githubusercontent.com/azouaoui-med/pro-sidebar-template/gh-pages/src/img/user.jpg"
                   alt="User picture"/>
               </div>
               <div class="user-info">
                 <span class="user-name">
       <strong>{user&&user.displayName}</strong>
                 </span>
                 <span class="user-role">Administrator</span>
                 <span class="user-status">
                   <i class="fa fa-circle"></i>
                   <span>Online</span>
                 </span>
               </div>
             </div>
        
             <div class="sidebar-search">
               <div>
                 <div class="input-group">
                   <input type="text" class="form-control search-menu" placeholder="Search..."/>
                   <div class="input-group-append">
                     <span class="input-group-text">
                       <i class="fa fa-search" aria-hidden="true"></i>
                     </span>
                   </div>
                 </div>
               </div>
             </div>
          
             <div class="sidebar-menu">
               <ul>
                 <li class="header-menu">
                   <span>General</span>
                 </li>
                 <li class="sidebar-dropdown">
                   <a href="#">
                     <i class="fa fa-tachometer-alt"></i>
                     <span>Dashboard</span>
                     <span class="badge badge-pill badge-warning">New</span>
                   </a>
                   <div class="sidebar-submenu">
                     <ul>
                       <li>
                         <a href="#">Dashboard 1
                           <span class="badge badge-pill badge-success">Pro</span>
                         </a>
                       </li>
                       <li>
                         <a href="#">Dashboard 2</a>
                       </li>
                       <li>
                         <a href="#">Dashboard 3</a>
                       </li>
                     </ul>
                   </div>
                 </li>
           
                 
                
                 <li class="header-menu">
                   <span>Extra</span>
                 </li>
                
                 <li>
                   <a >
                     <i class="fa fa-calendar"></i>
                     <span>Calendar</span>
                   </a>
                 </li>
                 <li>
                   <a href="#">
                     <i class="fa fa-folder"></i>
                     <span>Examples</span>
                   </a>
                 </li>
               </ul>
             </div>
         
           </div>
        
           <div class="sidebar-footer mb-5">
             <a href="#">
               <i class="fa fa-bell"></i>
               <span class="badge badge-pill badge-warning notification">3</span>
             </a>
             <a href="#">
               <i class="fa fa-envelope"></i>
               <span class="badge badge-pill badge-success notification">7</span>
             </a>
             <a href="#">
               <i class="fa fa-cog"></i>
               <span class="badge-sonar"></span>
             </a>
            
             <a className="btn-group dropup">
             <button type="button" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                 <i class="fa fa-power-off"></i>
              </button>
              <div class="dropdown-menu">
               <button onClick={signOut}>Cerrar Sesion</button>
               
              </div>
             </a>
           </div>
         </nav>
         
         <main class="page-content">
           
          {folder && folder.map(el=>{
             
             return <Folder name={el.data().name} id={el.data().id } author={el.data().author}></Folder>
          })}
          {
            file && file.map(el=>{
             
              return <File name={el.data().name} id={el.data().id } author={el.data().author}></File>
           })
          }
       
         </main>
       <Nav user={user}></Nav>
       </div>
        :<Login></Login> 
       }
      </Fragment>

    )
}


export default Side