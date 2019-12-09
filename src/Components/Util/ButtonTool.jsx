import React,{Fragment} from 'react'
import interact from 'interactjs'


const Button = ()=>{
  


    return (
         <Fragment>
             <div class="btn-group dropup drag">
  <button type="button" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    Dropup
  </button>
  <div class="dropdown-menu">
   <a>Lol</a>
  </div>
</div>


            
         </Fragment>
    )
}


export default Button