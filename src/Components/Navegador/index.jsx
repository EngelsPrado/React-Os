import React from 'react'
import Nav from '../Barra'


const Web=({user})=>{



    return(
        <div className="animated  zoomInRight delay-1s">
            <iframe src="https://www.bing.com" style={{
                width:'100%',
                height:'90vh'
            }}> </iframe>
         <Nav user={user}></Nav> 
        </div>
    )
}

export default Web