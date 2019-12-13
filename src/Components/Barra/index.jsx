import React,{useContext} from 'react'
import './style.css'
import { firestore, signOut } from '../../firebase'
import {UserContext} from './../../Providers/UserProvider'
import { navigate } from '@reach/router';
const uuidv4 = require('uuid/v4');

const Nav =({user})=>{

  const [,dni,dispatch] = useContext(UserContext)
 
   

   const newFolder=()=>{
      var id=uuidv4()
  
     firestore.collection("desktop").doc(user.uid).collection("folders").doc(id).set({
       name:'nueva carpeta',
       author:user.uid,
       type:'folder',
       id,
       date:Math.round((new Date()).getTime() / 1000)
     })

   }

   const newFile=()=>{
    var id=uuidv4()

   firestore.collection("desktop").doc(user.uid).collection("files").doc(id).set({
     name:'new file',
     author:user.uid,
     content:'',
     type:'file',
     id,
     date:Math.round((new Date()).getTime() / 1000),
     state:true
   })

 }

 const paste=async()=>{
 
    var datos=await firestore.collection("desktop").doc(user.uid).collection("files").doc(dni.ref).get()
    var id=uuidv4()
    console.log(datos.data())
 
    firestore.collection("desktop").doc(user.uid).collection("files").doc(id).set({
      name:datos.data().name,
      author:datos.data().author,
      content:datos.data().content,
      type:'file',
      id:id,
      date:Math.round((new Date()).getTime() / 1000),
      state:true
    })
 

 }

    return (
        <nav class="navbar  fixed-bottom navbar-expand-lg navbar-dark bg-dark">
  <button class="navbar-brand" onClick={()=>navigate('/')}>Home</button>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
      </li>
     
      <li class="nav-item dropdown dropup ">
        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Herramientas
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
          <a class="dropdown-item" href="#">Copiar</a>
          <a class="dropdown-item" href="#">Cortar</a>
          <button class="dropdown-item" onClick={paste} >Pegar</button>
          <div class="dropdown-divider"></div>
          <button onClick={newFolder} class="dropdown-item">Nueva Carpeta</button>
         
          <button   onClick={newFile}  class="dropdown-item" >Nuevo archivo</button>
        </div>
      </li>
      
    </ul>
    <button onClick={signOut}><img src="https://img.icons8.com/cotton/64/000000/power-off-button.png"/></button>
  </div>
</nav>
    )
}

export default Nav