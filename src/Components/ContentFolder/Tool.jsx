import React,{useState} from 'react'
import { firestore } from '../../firebase';
import * as firebase from 'firebase';
import { navigate } from '@reach/router';

const uuidv4 = require('uuid/v4');


const Tool=({id,user})=>{



   const nueva=(id)=>{

    var dni=uuidv4()
    firestore.collection("desktop").doc(user.uid).collection("folders").doc(dni).set({
        name:'nueva carpeta',
        author:user.uid,
        type:'folder',
        id:dni,
        dir:'child',
        date:Math.round((new Date()).getTime() / 1000)
    })
      
    firestore.collection("desktop").doc(user.uid).collection("folders").doc(id).update({
        folders:firebase.firestore.FieldValue.arrayUnion(dni)
    })

   }


   const newFile=()=>{
    var dni=uuidv4()

   firestore.collection("desktop").doc(user.uid).collection("files").doc(dni).set({
     name:'new file',
     author:user.uid,
     content:'',
     type:'file',
     id:dni,
     date:Math.round((new Date()).getTime() / 1000),
     state:true
   })

   firestore.collection("desktop").doc(user.uid).collection("folders").doc(id).update({
    files:firebase.firestore.FieldValue.arrayUnion({id:dni,name:'new file'})
  })

 }


    return(
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-bottom">
  <button class="navbar-brand"  onClick={()=>navigate('/')}><img src="https://img.icons8.com/cute-clipart/64/000000/react-native.png"/></button>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
     
     
      <li class="nav-item dropup">
        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Herramientas
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
          <button class="dropdown-item" onClick={()=>{nueva(id)}}>Crear nueva carpeta</button>
          <button   onClick={newFile}  class="dropdown-item" >Nuevo archivo</button>
          <div class="dropdown-divider"></div>
          <button class="dropdown-item" href="#">Pegar</button>
        </div>
      </li>
     
    </ul>

  </div>
</nav>
    )
}


export default Tool