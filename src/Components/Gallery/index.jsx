import React, {useCallback, Fragment,useContext} from 'react'
import {useDropzone} from 'react-dropzone'
import { storage,firestore } from '../../firebase'
import { useEffect } from 'react';
import { useState } from 'react';
import Nav from '../Barra';
import {UserContext} from './../../Providers/UserProvider'
const uuidv4 = require('uuid/v4');
var urls=[]
function MyDropzone({user}) {


    const [,dni,dispatch] = useContext(UserContext)
    const [fotos,setFotos]=useState(null)
    console.log(dni)
  const onDrop = useCallback(acceptedFiles => {
    // Do something with the files
    
   
    if(user){
        const uuid=uuidv4()
        console.log(acceptedFiles.length)
        for (let i = 0; i < acceptedFiles.length; i++) {
            // const element = array[index];
             storage.ref()
            .child("user-gallery")
            .child(user.uid)
            .child(acceptedFiles[i].name)
            .put(acceptedFiles[i])
            .then(response => response.ref.getDownloadURL())
            .then(photoURL => {urls=[...urls,photoURL]; 
             
             firestore.collection("desktop").doc(user.uid).collection("galeria").add({photoURL})
           
            
           });
         
            
         }
    }
    
  }, [user])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  useEffect(()=>{

    if (user){
        firestore.collection("desktop").doc(user.uid).collection("galeria").onSnapshot(el=>{
            setFotos(el.docs)
        })
       
    }
 
  },[user]) 

  return (
      <Fragment>

    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {
        isDragActive ?
          <p>Suelta las fotos aqui ...</p> :
          <p>O da click aqui</p>
      }
       
     
    </div>
    <div className="row ml-5 container">
     {

       fotos && fotos.map(el=>{
          
          return <div className="col-4 mt-3">
              <button class="btn btn-link dropdown-toggle" type="button" id="gedf-drop1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <i class="fa fa-ellipsis-h"></i>
                                    </button>
                                    <div class="dropdown-menu dropdown-menu-right" aria-labelledby="gedf-drop1">
                                        
                                        <button class="dropdown-item" onClick={()=>{dispatch({type:'bg',bg:el.data().photoURL})}}>Fondo</button>
                                      
                                        
                                    </div>
             <img src={el.data().photoURL} className="img-fluid" />  </div>

       })

     }


   </div>
    <Nav user={user}></Nav>
   </Fragment>
  )
}

export default MyDropzone