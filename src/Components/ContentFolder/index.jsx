import React,{useEffect,useState, Fragment} from 'react'
import { navigate } from "@reach/router"
import { firestore } from '../../firebase'
import File from '../Folder&File/File'


const ContentFolder=({id,user})=>{


    const [files,setfiles]=useState(null)
    console.log(files)
   useEffect(()=>{


     function getFiles(){

       
       if (user){
          firestore.collection("desktop").doc(user&&user.uid).collection("folders").doc(id).onSnapshot(datos=>{
           
            setfiles(datos.data().files)
          })
         
       }

     }
 
     getFiles()
   },[user])


   return (

     <main class="page-content">
      {
        files && files.map( el=>{
        
        
           console.log(el) 
             return  <div className="ml-5">
                 <File name={el.name} id={el.id} author={user.uid} folder={id}></File>
             </div>
           })
     
      }
     </main>

   )
  

}

export default ContentFolder