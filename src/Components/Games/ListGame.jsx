import React, { Fragment } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { Basket, Mario, Run } from '.'



const ListGame=({user,id})=>{

    const [game,setGame]=useState(null)

    useEffect(()=>{

      switch (id) {
          case '1':
              setGame(<Basket></Basket>) 
              break;
          case '2':
                setGame(<Run></Run>) 
                break;    
           case '3':
                setGame(<Mario></Mario>) 
                break;
         
          default:
              break;
      }

    })

    return(
     
      <Fragment>
        {
            game
        }
      </Fragment>
    )
}


export default ListGame