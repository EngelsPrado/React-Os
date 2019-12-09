import React,{useContext} from 'react';
import {Router} from '@reach/router'
import './App.css';
import Side from './Components/Side';
import Login from './Components/Login/Login';
import Editor from './Components/Editor';
import Nav from './Components/Barra';
import {UserContext} from './Providers/UserProvider'
function App() {

 const user = useContext(UserContext)
  
 console.log(user)

  return (
    <div className="App">

      <Router>
      <Side user={user} path="/" ></Side>

      </Router>
   
   {/* <Login></Login> */}
   {/* <Editor></Editor> */}
 
    </div>
  );
}

export default App;
