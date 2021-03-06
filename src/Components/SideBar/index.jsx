import React, { useState } from 'react'
import { Image, Icon, Button, Menu, Segment, Sidebar } from 'semantic-ui-react'
import Calendar from '../Util/Calendar'
import Games from '../Games'
import { navigate } from '@reach/router'
import './style.css'

const SidebarExampleSidebar = ({children,user}) => {
  const [visible, setVisible] = useState(false)
  const [icon,setIcon]=useState('angle double left') 
 
  return (
    <Sidebar.Pushable as={Segment} >
        <Button className="mt-0 fixed-top" toggle active={visible} onClick={()=>setVisible(!visible)}>
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
        className="home-bg"
      >
        <Menu.Item as='a'>
        <Image src={user.photoURL} size='medium' circular />

        <h3>{user.displayName}</h3>
        </Menu.Item>
        <Menu.Item as='a'>
          <Icon name='home' onClick={()=>navigate('/')}/>
          Home
        </Menu.Item>
        <Menu.Item as='a'  onClick={()=>navigate('/games')} >
          <Icon name='gamepad' />
          Games
        </Menu.Item>
        <Menu.Item as='a'>
          <Icon name='calendar' onClick={()=>navigate('/calendar')} />
          Calendario
        </Menu.Item>
        <Menu.Item as='a'>
          <Icon name='file image outline' onClick={()=>navigate('/galeria')} />
          Galeria
        </Menu.Item>
        <Menu.Item as='a'>
          <Icon name='search' onClick={()=>navigate('/web')} />
          Navegador
        </Menu.Item>
       
        <div >  <iframe src="https://www.zeitverschiebung.net/clock-widget-iframe-v2?language=es&size=medium&timezone=America%2FManagua" width="100%" height="115" frameborder="0" seamless></iframe> </div>
      </Sidebar>

      <Sidebar.Pusher >
          
          {children}
          
      </Sidebar.Pusher>
    </Sidebar.Pushable>
  )
}

export default SidebarExampleSidebar