import React, {useCallback, Fragment} from 'react'
import {useDropzone} from 'react-dropzone'
import { storage,firestore } from '../../firebase'
import { useEffect } from 'react';
import { useState } from 'react';
import Nav from '../Barra';
const uuidv4 = require('uuid/v4');
var urls=[]
function MyDropzone({user}) {

    const [fotos,setFotos]=useState(null)

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
       <div className="row ml-5 container">
     {

       fotos && fotos.map(el=>{
          
          return <div className="col-4 mt-3"> <img src={el.data().photoURL} className="img-fluid" />  </div>

       })

     }


   </div>
     
    </div>
    <Nav user={user}></Nav>
   </Fragment>
  )
}

export default MyDropzone