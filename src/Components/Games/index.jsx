import React,{Fragment,useState,useEffect} from 'react'
import Nav from '../Barra'
import { Icon } from 'semantic-ui-react'
import { navigate } from '@reach/router'
import { firestore } from '../../firebase'


export const Mario=()=>{
    return (
       
    <Fragment>
          <button class="fixed-top"  onClick={()=>navigate('/games')} > <Icon name="angle left" size='huge'></Icon></button>
         <iframe width="560" height="315" allow="fullscreen; autoplay; encrypted-media" src="https://games.construct.net/769/latest" frameborder="0" allowfullscreen="true" msallowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true" allowpaymentrequest="false" referrerpolicy="unsafe-url" sandbox="allow-same-origin allow-forms allow-scripts allow-pointer-lock allow-orientation-lock allow-popups" scrolling="no"></iframe>

    </Fragment>

  
    )
}


export const Run=()=>{
    return (
       
       <Fragment>
           <button onClick={()=>navigate('/games')} class="fixed-top" > <Icon name="angle left" size='huge'></Icon></button>
        <iframe width="560" height="315" allow="fullscreen; autoplay; encrypted-media" src="https://games.construct.net/904/latest" frameborder="0" allowfullscreen="true" msallowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true" allowpaymentrequest="false" referrerpolicy="unsafe-url" sandbox="allow-same-origin allow-forms allow-scripts allow-pointer-lock allow-orientation-lock allow-popups" scrolling="no"></iframe>
  
       </Fragment>
    )
}



export const Basket=()=>{
    return (
       

       <Fragment>
            <button onClick={()=>navigate('/games')} class="fixed-top"> <Icon name="angle left" size='huge'></Icon></button>
            <iframe width="560" height="315" allow="fullscreen; autoplay; encrypted-media" src="https://games.construct.net/1039/latest" frameborder="0" allowfullscreen="true" msallowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true" allowpaymentrequest="false" referrerpolicy="unsafe-url" sandbox="allow-same-origin allow-forms allow-scripts allow-pointer-lock allow-orientation-lock allow-popups" scrolling="no"></iframe>
  
       </Fragment>
    )
}

const Games=({user})=>{

   const [game,setGame]=useState(null)
   const [fondo,setFondo]=useState('')
   
   useEffect(()=>{
   
    if(user){
        firestore.collection("desktop").doc(user.uid).collection("fondo").doc(user.uid).onSnapshot(fondo=>{
        setFondo(fondo.data().url)
    })
    }

   },[user])
  return (
  
   <Fragment>
    
  <div className="row"  style={{
         backgroundImage: 'url(' + fondo + ')',
         height:'100vh', 
         
      }}>

        <div className="col-3 ml-5">
            <button onClick={()=>navigate('/games/1')} >
            <img id="GameMainImage" class="img-fluid" src="https://s1.construct.net/uploads/2087/e7667f2e-e1ca-41cf-a1a7-4406cbf63e66/c/-895885962/mainimage.png"/>
            <h3 className="text-white">Basketball Challenge</h3>
            </button>
        </div>
        <div className="col-3">
            <button onClick={()=>navigate('/games/2')}>
            <img id="GameMainImage" class="img-fluid"src="https://s1.construct.net/uploads/1817/2f83a8c7-7be6-4e47-817f-0e9600e9bf0c/c/-895885962/mainimage.png"/>
            <h3 className="text-white">Pixel Bear Adventure</h3>
            </button>
        </div>
        <div className="col-3">
            <button onClick={()=>navigate('/games/3')}>
            <img id="GameMainImage" class="img-fluid"src="https://s1.construct.net/uploads/1547/74ee61e9-3991-40bb-a84e-b84cea5274f2/c/-895885962/mainimage.png"/>
            <h3 className="text-white">Mario Bros Demo</h3>
            </button>
        </div>
       </div>

    <Nav></Nav>
   </Fragment>
 

  )

}

export default Games
