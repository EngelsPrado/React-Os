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
    const [fondo,setFondo]=useState('')
    console.log(dni)
  const onDrop = useCallback(acceptedFiles => {
    // Do something with the files
    
   
    if(user){
       
        console.log(acceptedFiles.length)
        for (let i = 0; i < acceptedFiles.length; i++) {
            // const element = array[index];
            const uuid=uuidv4()
             storage.ref()
            .child("user-gallery")
            .child(user.uid)
            .child(acceptedFiles[i].name)
            .put(acceptedFiles[i])
            .then(response => response.ref.getDownloadURL())
            .then(photoURL => {urls=[...urls,photoURL]; 
             
             firestore.collection("desktop").doc(user.uid).collection("galeria").doc(uuid).set({photoURL,id:uuid})
           
            
           });
         
            
         }
    }
    
  }, [user])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  const eliminar=(id)=>{

    firestore.collection("desktop").doc(user.uid).collection("galeria").doc(id).delete()

  }

  const Fondo=(url)=>{
 
    firestore.collection("desktop").doc(user.uid).collection("fondo").doc(user.uid).set({
      url:url
    }) 

  }

  useEffect(()=>{

    if (user){
        firestore.collection("desktop").doc(user.uid).collection("galeria").onSnapshot(el=>{
            setFotos(el.docs)
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

    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {
        isDragActive ?
          <p>Suelta las fotos aqui ...</p> :
          <p>O da click aqui</p>
      }
       
     
    </div>
    <div className="row "  style={{
        backgroundImage: 'url(' + fondo + ')',
        height:'100vh' 
        
      }}>
     {

       fotos && fotos.map(el=>{
          
          return <div className="col-4 mt-3">
              <button class="btn btn-link dropdown-toggle" type="button" id="gedf-drop1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <i class="fa fa-ellipsis-h"></i>
                                    </button>
                                    <div class="dropdown-menu dropdown-menu-right" aria-labelledby="gedf-drop1">
                                        
                                        <button class="dropdown-item" onClick={()=>Fondo(el.data().photoURL)}>Establecer como fondo de pantalla</button>
                                        <button class="dropdown-item" onClick={()=>eliminar(el.data().id)}>Eliminar</button>

                                        
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