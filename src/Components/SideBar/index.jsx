import React, { useState } from 'react'
import { Header, Icon, Button, Menu, Segment, Sidebar } from 'semantic-ui-react'
import Calendar from '../Util/Calendar'

const SidebarExampleSidebar = ({children}) => {
  const [visible, setVisible] = useState(true)
  const [icon,setIcon]=useState('angle double left') 
  const [Child,setchild]=useState(children)
  return (
    <Sidebar.Pushable as={Segment}>
        <Button className="mt-0 " toggle active={visible} onClick={()=>setVisible(!visible)}>
        <Icon  name={icon} />
      </Button>
      <Sidebar
        as={Menu}
        animation='push'
        icon='labeled'
        inverted
        onHide={() =>{ setVisible(false)
           setIcon('angle double left') }}
        vertical
        visible={visible}
        width='wide'
      >
        <Menu.Item as='a'>
          <Icon name='home' onClick={()=>setchild(children)}/>
          Home
        </Menu.Item>
        <Menu.Item as='a'>
          <Icon name='gamepad' />
          Games
        </Menu.Item>
        <Menu.Item as='a'>
          <Icon name='calendar' onClick={()=>setchild(<Calendar></Calendar>)} />
          Calendario
        </Menu.Item>
        <div >  <iframe src="https://www.zeitverschiebung.net/clock-widget-iframe-v2?language=es&size=medium&timezone=America%2FManagua" width="100%" height="115" frameborder="0" seamless></iframe> </div>
      </Sidebar>

      <Sidebar.Pusher>
     
          
          {Child}
          
      </Sidebar.Pusher>
    </Sidebar.Pushable>
  )
}

export default SidebarExampleSidebar