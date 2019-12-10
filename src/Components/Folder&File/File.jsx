import React from 'react'
import { firestore } from '../../firebase'
import { navigate } from "@reach/router"


const File = ({name,id,author})=>{

    const eliminar=(id)=>{
  
        firestore.collection("desktop").doc(author).collection("files").doc(id).delete()
      
   }


    return (
        <div id="yes-drop" data-id={`${id&&id}`} data-name={`${name&&name}`} onDoubleClick={(e)=>navigate(`/file/${id}`)} class="drag-drop d-flex row justify-content-center">
            <div class="dropdown">
                                    <button class="btn btn-link dropdown-toggle" type="button" id="gedf-drop1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <i class="fa fa-ellipsis-h"></i>
                                    </button>
                                    <div class="dropdown-menu dropdown-menu-right" aria-labelledby="gedf-drop1">
                                        
                                        <button class="dropdown-item" onClick={()=>{eliminar(id)}}>Eliminar</button>
                                        <button class="dropdown-item" onClick={()=>{eliminar(id)}}>Cambiar nombre</button>
                                        
                                    </div>
                                </div>
              <img src="https://img.icons8.com/cute-clipart/64/000000/file.png"></img>
    <span>{name}</span>
         </div>
       
    )
}

export default File