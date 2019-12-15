import React,{useState} from 'react'
import interact from 'interactjs'
import './style.css'
import { firestore } from '../../firebase'
import * as firebase from 'firebase';
import { navigate } from "@reach/router"

const Folder =({name,id,author})=>{


  const [active,setActive]=useState(false)
  const [txt,settxt]=useState('')
  const eliminar=(id)=>{
  
       firestore.collection("desktop").doc(author).collection("folders").doc(id).delete()
  }

 console.log(name)
    
// enable draggables to be dropped into this
interact('.dropzone').dropzone({
    // only accept elements matching this CSS selector
    accept: '#yes-drop',
    // Require a 75% element overlap for a drop to be possible
    overlap: 0.65,
  
    // listen for drop related events:
  
    ondropactivate: function (event) {
      // add active dropzone feedback
      event.target.classList.add('drop-active')
    },
    ondragenter: function (event) {
      var draggableElement = event.relatedTarget
      var dropzoneElement = event.target
  
      // feedback the possibility of a drop
      dropzoneElement.classList.add('drop-target')
      draggableElement.classList.add('can-drop')
    //   draggableElement.textContent = 'Dragged in'
  
   
    },
    ondragleave: function (event) {
      // remove the drop feedback style
      event.target.classList.remove('drop-target')
      event.relatedTarget.classList.remove('can-drop')
    //   event.relatedTarget.textContent = 'Dragged out'
  
    },
    ondrop: function (event) {
    //   event.relatedTarget.textContent = 'Dropped'
     var el=document.getElementById("yes-drop")
     console.log(el.dataset.id)
     firestore.collection("desktop").doc(author).collection("folders").doc(id).update({
       files:firebase.firestore.FieldValue.arrayUnion({id:el.dataset.id,name:el.dataset.name})
     }) 
     firestore.collection("desktop").doc(author).collection("files").doc(el.dataset.id).update({
       state:false
     })
    },
    ondropdeactivate: function (event) {
      // remove active dropzone feedback
      event.target.classList.remove('drop-active')
      event.target.classList.remove('drop-target')
    }
  })
  
  interact('.drag-drop')
    .draggable({
      inertia: true,
      modifiers: [
        interact.modifiers.restrictRect({
          restriction: 'parent',
          endOnly: true
        })
      ],
      autoScroll: true,
      // dragMoveListener from the dragging demo above
      onmove: dragMoveListener
    })

    //Also is drag
    interact('.draggable')
  .draggable({
    // enable inertial throwing
    inertia: true,
    // keep the element within the area of it's parent
    modifiers: [
      interact.modifiers.restrictRect({
        restriction: 'parent',
        endOnly: true
      })
    ],
    // enable autoScroll
    autoScroll: true,

    // call this function on every dragmove event
    onmove: dragMoveListener,
    // call this function on every dragend event
    
  })

  

function dragMoveListener (event) {
  var target = event.target
  // keep the dragged position in the data-x/data-y attributes
  var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
  var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy

  // translate the element
  target.style.webkitTransform =
    target.style.transform =
      'translate(' + x + 'px, ' + y + 'px)'

  // update the posiion attributes
  target.setAttribute('data-x', x)
  target.setAttribute('data-y', y)
 
}
 
window.dragMoveListener = dragMoveListener
// this is used later in the resizing and gesture demos

const cambiar=(id)=>{

  setActive(true)
 
}

    const Tag=!active? <span>{name}</span>:<div class="input-group input-group-sm mb-3">
    
    <input type="text" value={txt} onChange={(e)=>{settxt(e.target.value)}} onKeyUp={(e)=>{if(e.keyCode===13){
        firestore.collection("desktop").doc(author).collection("folders").doc(id).update({
          name:txt
        })     
        console.log('cambiando nombre a'+txt)
        setActive(false)                  
    }}} class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm"/>
  </div> 

    return (
        <div onDoubleClick={(e)=>navigate(`/folder/${id}`)} id="outer-dropzone" class="ml-4 dropzone anifolder draggable d-flex row justify-content-center">
           <div class="dropdown">
                                    <button class="btn btn-link dropdown-toggle" type="button" id="gedf-drop1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <i class="fa fa-ellipsis-h"></i>
                                    </button>
                                    <div class="dropdown-menu dropdown-menu-right" aria-labelledby="gedf-drop1">
                                        
                                        <button class="dropdown-item" onClick={()=>{eliminar(id)}}>Eliminar</button>
                                        <button class="dropdown-item" onClick={()=>{cambiar(id)}}>Cambiar nombre</button>
                                        
                                    </div>
                                </div>
                <img  src="https://img.icons8.com/cute-clipart/64/000000/folder-invoices.png"/>
               {
                 Tag
               }
                
        </div>
    )
      

}

Folder.defaultProps = {
  name: 'nueva carpeta'
};

export default Folder