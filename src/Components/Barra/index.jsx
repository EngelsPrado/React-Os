import React from 'react'
import './style.css'
import NewFolder from '../Util/NewFolder'
import { firestore } from '../../firebase'
const uuidv4 = require('uuid/v4');

const Nav =({user})=>{

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
     type:'file',
     id,
     date:Math.round((new Date()).getTime() / 1000)
   })

 }

    return (
        <nav class="navbar  fixed-bottom navbar-expand-lg navbar-dark bg-dark">
  <a class="navbar-brand" href="#">Navbar</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">Link</a>
      </li>
      <li class="nav-item dropdown dropup ">
        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Dropdown
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
          <a class="dropdown-item" href="#">Copiar</a>
          <a class="dropdown-item" href="#">Cortar</a>
          <a class="dropdown-item" href="#">Pegar</a>
          <div class="dropdown-divider"></div>
          <button onClick={newFolder} class="dropdown-item">Nueva Carpeta</button>
         
          <button   onClick={newFile}  class="dropdown-item" >Nuevo archivo</button>
        </div>
      </li>
      
    </ul>

  </div>
</nav>
    )
}

export default Nav