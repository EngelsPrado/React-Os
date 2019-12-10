import React, { useState } from 'react'
import { Header, Icon, Button, Menu, Segment, Sidebar } from 'semantic-ui-react'

const SidebarExampleSidebar = ({children}) => {
  const [visible, setVisible] = useState(true)
  console.log(visible)
  return (
    <Sidebar.Pushable as={Segment}>
        <Button className="mt-0 " toggle active={visible} onClick={()=>setVisible(!visible)}>
        Toggle
      </Button>
      <Sidebar
        as={Menu}
        animation='overlay'
        icon='labeled'
        inverted
        onHide={() => setVisible(false)}
        vertical
        visible={visible}
        width='thin'
      >
        <Menu.Item as='a'>
          <Icon name='home' />
          Home
        </Menu.Item>
        <Menu.Item as='a'>
          <Icon name='gamepad' />
          Games
        </Menu.Item>
        <Menu.Item as='a'>
          <Icon name='camera' />
          Channels
        </Menu.Item>
      </Sidebar>

      <Sidebar.Pusher>
     
          
          {children}
    
      </Sidebar.Pusher>
    </Sidebar.Pushable>
  )
}

export default SidebarExampleSidebar