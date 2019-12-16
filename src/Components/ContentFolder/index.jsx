import React,{useEffect,useState, Fragment} from 'react'
import { navigate } from "@reach/router"
import { firestore } from '../../firebase'
import File from '../Folder&File/File'
import Tool from './Tool'
import Folder from '../Folder&File/Folder'
import Login from '../Login/Login'

var fet=[]

const ContentFolder=({id,user,children})=>{


    const [files,setfiles]=useState(null)
    const [folders,setFolders]=useState(null)
    console.log(children)

   useEffect(()=>{


     function getFiles(){

      
       if (user){
          firestore.collection("desktop").doc(user&&user.uid).collection("folders").doc(id).onSnapshot(datos=>{
           
            if(datos.data().files!=undefined)
              setfiles(datos.data().files)
          
            datos.data().folders && datos.data().folders.map(dni=>{
              
              var fold=firestore.collection("desktop").doc(user&&user.uid).collection("folders").doc(dni).get()  
               fold.then(doc=>{fet=[...fet,doc.data()]
                setFolders(fet) 
               
              })
              fet=[]
            })
            
          })
         
       }

     }

   

 
     getFiles()
   },[user])


   return (

     <Fragment>
      {
       user? <Fragment>
           <Tool id={id} user={user}></Tool>
       <main class="page-content" style={{
         backgroundColor:'#015668',
         height:'100vh'
       }}>
      {
        files && files.map( el=>{
        
           console.log(el) 
             return  el && <File name={el.name} id={el.id} author={user.uid} folder={id}></File>
           
           })
 

     
      }

       {folders && folders.map(el=>{
             
               return el && <Folder name={el&&el.name} id={el&&el.id} author={el.author} to={el.id} folder={id}></Folder>
           })}
     </main>
     {children}
        </Fragment>:<Login></Login>

      }
     </Fragment>

   )
  

}

export default ContentFolder