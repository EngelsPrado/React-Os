import React,{useContext,useState} from 'react'
import { firestore } from '../../firebase'
import { navigate } from "@reach/router"
import {UserContext} from './../../Providers/UserProvider'
import * as firebase from 'firebase';

const File = ({name,id,author,folder})=>{


    const [,dni,dispatch] = useContext(UserContext)
    const [active,setActive]=useState(false)
    const [txt,settxt]=useState('')

    const eliminar=(id)=>{
        
        firestore.collection("desktop").doc(author).collection("files").doc(id).delete()

        //Elimando en los folders
        if(folder!=''){
           
           firestore.collection("desktop").doc(author).collection("folders").doc(folder).update({
            files:firebase.firestore.FieldValue.arrayRemove({id:id,name:name})
           })
        }
      
   }

   const cortar=()=>{

    firestore.collection("desktop").doc(author).collection("files").doc(id).update({
        state:false
    })

     //Elimando en los folders
     if(folder!=''){
      
       firestore.collection("desktop").doc(author).collection("folders").doc(folder).update({
        files:firebase.firestore.FieldValue.arrayRemove({id:id,name:name})
       })
    }

   
    dispatch({type:'copy',ref:id})

   } 
   const cambiar=(id)=>{

    setActive(true)
   
  }

   const Tag=!active? <span>{name}</span>:<div class="input-group input-group-sm mb-3">
    
   <input type="text" value={txt} onChange={(e)=>{settxt(e.target.value)}} onKeyUp={(e)=>{if(e.keyCode===13){
       firestore.collection("desktop").doc(author).collection("files").doc(id).update({
         name:txt
       })     
       if(folder!=''){
      
       firestore.collection("desktop").doc(author).collection("folders").doc(folder).update({
        files:firebase.firestore.FieldValue.arrayRemove({id:id,name:name})
       })

       firestore.collection("desktop").doc(author).collection("folders").doc(folder).update({
        files:firebase.firestore.FieldValue.arrayUnion({id:id,name:txt})
       })
    }
       

       setActive(false)                  
   }}} class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm"/>
 </div> 


    return (
        <div id="yes-drop" data-id={`${id&&id}`} data-name={`${name&&name}`} onDoubleClick={(e)=>navigate(`/file/${id}`)} class="ml-4 drag-drop d-flex row justify-content-center">
            <div class="dropdown">
                                    <button class="btn btn-link dropdown-toggle" type="button" id="gedf-drop1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <i class="fa fa-ellipsis-h"></i>
                                    </button>
                                    <div class="dropdown-menu dropdown-menu-right" aria-labelledby="gedf-drop1">
                                        
                                        <button class="dropdown-item" onClick={()=>{eliminar(id)}}>Eliminar</button>
                                        <button class="dropdown-item" onClick={()=>{ dispatch({type:'copy',ref:id}) }}>Copiar</button>
                                        <button class="dropdown-item" onClick={()=>{ cortar(id) }}>Cortar</button>
                                        <button class="dropdown-item"  onClick={()=>{cambiar(id)}}>Cambiar nombre</button>
                                        
                                    </div>
                                </div>
              <img src="https://img.icons8.com/cute-clipart/64/000000/file.png"></img>
    {Tag}
         </div>
       
    )
}

export default File