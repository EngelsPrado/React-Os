import React,{Fragment,useState,useEffect} from 'react'
import Nav from '../Barra'
import { Icon } from 'semantic-ui-react'
import { navigate } from '@reach/router'
import { firestore } from '../../firebase'
import Login from '../Login/Login'


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
    
    {
        user? <Fragment>
            <div className="row justify-content-center align-items-center"  style={{
            backgroundColor:'#015668',
            height:'100vh', 
            
         }}>
            <div className="animated  bounceIn">
            <h2 className="text-white">Juegos</h2> 
            <img src="https://img.icons8.com/flat_round/64/000000/play--v1.png"/>
           </div>
           <div className="col-3 ml-5 animated  rollIn delay-1s">
               <button onClick={()=>navigate('/games/1')} >
               <img id="GameMainImage" class="img-fluid" src="https://s1.construct.net/uploads/2087/e7667f2e-e1ca-41cf-a1a7-4406cbf63e66/c/-895885962/mainimage.png"/>
               <h3 className="text-white animated infinite pulse">Basketball Challenge<img src="https://img.icons8.com/doodle/48/000000/basketball--v1.png"></img></h3>
               </button>
           </div>
           <div className="col-3 animated  rollIn delay-1s">
               <button onClick={()=>navigate('/games/2')}>
               <img id="GameMainImage" class="img-fluid"src="https://s1.construct.net/uploads/1817/2f83a8c7-7be6-4e47-817f-0e9600e9bf0c/c/-895885962/mainimage.png"/>
               <h3 className="text-white animated infinite pulse">Pixel Bear Adventure<img src="https://img.icons8.com/bubbles/50/000000/bear.png"></img></h3>
               </button>
           </div>
           <div className="col-3 animated  rollIn delay-1s">
               <button onClick={()=>navigate('/games/3')}>
               <img id="GameMainImage" class="img-fluid"src="https://s1.construct.net/uploads/1547/74ee61e9-3991-40bb-a84e-b84cea5274f2/c/-895885962/mainimage.png"/>
               <h3 className="text-white animated infinite pulse">Mario Bros Demo <img src="https://img.icons8.com/cute-clipart/64/000000/super-mario.png"></img></h3>
               </button>
           </div>
          </div>
   
       <Nav></Nav>
        </Fragment>:<Login></Login>
    }
   </Fragment>
 

  )

}

export default Games
