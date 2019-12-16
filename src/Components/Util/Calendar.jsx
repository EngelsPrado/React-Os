import React from 'react'
import { navigate } from '@reach/router'
import { Icon } from 'semantic-ui-react'



const Calendar =()=>{

    return (
       <div  style={{
        backgroundColor:'#015668',
        height:'100vh'
      }} className="animated  bounceIn row justify-content-center align-items-center">
           <button onClick={()=>navigate('/')} class="fixed-top" > <Icon name="angle left" size='huge'></Icon></button>

            <iframe  src="https://calendar.google.com/calendar/embed?height=600&amp;wkst=1&amp;bgcolor=%23ffffff&amp;ctz=America%2FManagua&amp;src=ZW5nZWxzbG92ZTA5QGdtYWlsLmNvbQ&amp;src=YWRkcmVzc2Jvb2sjY29udGFjdHNAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&amp;src=dnM4NmRyY2w4cnNiZWFrNzdkMGRlbDdnZDhAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&amp;src=ZXMubmkjaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20&amp;color=%235A9A08&amp;color=%233366CC&amp;color=%239D7000&amp;color=%231F753C&amp;title=Calendario" width="800" height="600" frameborder="0" scrolling="no"></iframe>
            
       </div>
    )
}

export default Calendar