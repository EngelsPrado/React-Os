import React, { useState,useEffect } from 'react';

import Froalaeditor from 'froala-editor';

// Require Editor CSS files.
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
// Include special components if required.
//  import FroalaEditorView from 'react-froala-wysiwyg/FroalaEditorView';
// import FroalaEditorA from 'react-froala-wysiwyg/FroalaEditorA';
// import FroalaEditorButton from 'react-froala-wysiwyg/FroalaEditorButton';
// import FroalaEditorImg from 'react-froala-wysiwyg/FroalaEditorImg';
// import FroalaEditorInput from 'react-froala-wysiwyg/FroalaEditorInput';
import FroalaEditorComponent from 'react-froala-wysiwyg';
import 'froala-editor/js/plugins/image.min.js'
import 'froala-editor/js/plugins/char_counter.min.js'
import 'froala-editor/js/plugins/print.min.js'
import 'froala-editor/js/plugins/colors.min.js'
import 'froala-editor/js/plugins/table.min.js'
import 'froala-editor/js/plugins/code_view.min.js'
import 'froala-editor/js/plugins/emoticons.min.js'
import { firestore } from '../../firebase';
import Nav from '../Barra';

const Editor =({id,user})=>{
  
      const [content,setcontent]=useState('')
      const [fondo,setFondo]=useState('')
     const save=()=>{
      firestore.collection("desktop").doc(user&&user.uid).collection("files").doc(id).update({
        content:content
      })
     }

     useEffect(()=>{
   
      if(user){
        firestore.collection("desktop").doc(user.uid).collection("fondo").doc(user.uid).onSnapshot(fondo=>{
          setFondo(fondo.data().url)
      })
      }
  
     },[user])
      
      useEffect(()=>{
        
        async function getDatos(){
          var dato
          if (user){
            dato=await firestore.collection("desktop").doc(user&&user.uid).collection("files").doc(id).get()
            console.log(dato.data()) 
            setcontent(dato.data().content)
         }   
        }
  
       getDatos()
      },[user])

     var config={
        placeholderText: 'Edit!',
        charCounterCount: true,
        autofocus: true,
         codeMirror: true,
        //  documentReady: true,
         htmlAllowedTags: ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
        imageUpload: true,
        // colorsText: ['#61BD6D', '#1ABC9C', '#54ACD2', 'REMOVE'],
        tableCellMultipleStyles: true,
       
      }

    return (
        <div id="froala-editor "   style={{
          backgroundImage: 'url(' + fondo + ')',
          height:'100vh',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment:'fixed',
          backgroundSize:'cover'
        }}>
          <Nav></Nav>
          <div className="container"  style={{
          
          margin:'0 auto'
          
        }}>
          <div class="dropdown">
                                    <button class="btn btn-link dropdown-toggle" type="button" id="gedf-drop1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <i class="fa fa-ellipsis-h"></i>
                                    </button>
                                    <div class="dropdown-menu dropdown-menu-right" aria-labelledby="gedf-drop1">
                                        
                                        <button class="dropdown-item" onClick={save}>Guardar</button>
                                
                                        
                                    </div>
                                </div>
           <FroalaEditorComponent  model={content} onModelChange={(model=>setcontent(model))} tag='textarea' config={config}/>
          </div>
        </div>

        
    )
}


export default Editor