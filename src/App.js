import Navigation from './components/Navigation'
import './App.css';
import { useState } from 'react';
import {BrowserRouter,Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Chat from './pages/Chat'
import Signup from './pages/Signup'
import Support from './pages/Support.js'
import { useSelector } from 'react-redux';
import {AppContext,socket} from './context/appContext';

function App() {
  const user = useSelector((state)=>state.user);
  const [rooms, setRooms] = useState([]);
  const [currentRoom, setCurrentRoom] = useState([]);
  const [members, setMembers] = useState([])
  const [messages, setMessages] = useState([]);
  const [privateMemberMsg, setPrivateMeberMsg]= useState([])
  const [newMessages, setNewMessages] = useState([])
  return (
  <AppContext.Provider value={{socket, currentRoom, setCurrentRoom, members, setMembers, messages,
   setMessages,privateMemberMsg,setPrivateMeberMsg,rooms,setRooms,newMessages,setNewMessages}}>
    <BrowserRouter>  
      <Navigation/> 
      <Routes>
        <Route path='/' element ={<Home/>} />
        {!user && (
          <>
        <Route path='/login' element ={<Login/>} />
        <Route path='/signup' element ={<Signup/>} />
        </>
        )}
        <Route path='/chat' element ={<Chat/>} />
        <Route path='/support' element ={<Support/>} />
      </Routes>
    </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;
