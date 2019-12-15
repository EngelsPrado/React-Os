import React,{useContext} from 'react';
import {Router} from '@reach/router'
import './App.css';
import Side from './Components/Side';

import Editor from './Components/Editor';

import {UserContext} from './Providers/UserProvider'
import ContentFolder from './Components/ContentFolder';
import Games from './Components/Games';
import Calendar from './Components/Util/Calendar';
import ListGame from './Components/Games/ListGame';
import MyDropzone from './Components/Gallery';


function App() {

 const [user] = useContext(UserContext)
  
 console.log(user)

  return (
    <div className="App">

      <Router>
      <Side user={user} path="/" ></Side>
      <Editor path="/file/:id" user={user}></Editor>
      <Games user={user} path="/games" ></Games>
      <ListGame  user={user} path="/games/:id"  ></ListGame>
      <Calendar user={user} path="/calendar" ></Calendar>
      <MyDropzone user={user} path="/galeria" ></MyDropzone>
      {/* <Profile  user={user} path="/perfil/:uid" > </Profile> */}
      <ContentFolder path="/folder/:id" user={user} ></ContentFolder>
      </Router>
   
   {/* <Login></Login> */}
   {/* <Editor></Editor> */}
 
    </div>
  );
}

export default App;
