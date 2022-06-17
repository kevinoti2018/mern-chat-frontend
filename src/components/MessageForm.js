import React,{useState,useContext,useRef,useEffect} from 'react'
import {Button, Form, Col, Row} from 'react-bootstrap'
import {useSelector} from 'react-redux'
import {AppContext} from '../context/appContext'
import './MessageForm.css'
// import Dropzone from 'react-dropzone'
// import {UploadOutlined} from '@ant-design/icons'
// import Axios from 'axios'
const MessageForm = () => {
  const [message, setMessage,] = useState("");
  const user = useSelector((state)=>state.user);
  const {socket,currentRoom,setMessages,messages,privateMemberMsg } = useContext(AppContext);
  const messageEndRef = useRef(null);
  useEffect(()=>{
    scrollToBottom();
  },[messages])

  function getFormatDate(){
    const date = new Date();
    const year  = date.getFullYear();
    let month = (1+date.getMonth()).toString();
    month = month.length > 1 ? month:'0' + month;
    let day = date.getDate().toString();
    day = day.length > 1 ?day:'0' + day;
    return month + '/' + day + '/'+ year;
  };

   const todayDate = getFormatDate();
   socket.off('room-messages').on('room-messages',(roomMessages)=>{
     console.log('room messages', roomMessages )
    setMessages(roomMessages)
   });

  function handleSubmit(e){
    e.preventDefault();
    if(!message) return;
    const today = new Date();
    const minutes = today.getMinutes() < 10 ? "0" + today.getMinutes(): today.getMinutes()
    const time = today.getHours() +":"+ minutes
    const roomid = currentRoom;
    socket.emit('message-room', roomid , message , user,time , todayDate)
    setMessage("");
  };
  
  function scrollToBottom(){
    messageEndRef.current?.scrollIntoView({behavior:"smooth"})
  }
  
  // function onDrop(files){
  //   console.log(files)
  //   let formData = new FormData;

  //   const config = {
  //     header:{'content-type': 'multipart/form/form-data'}
  //   }
  //     formData.append('file', files[0])
  //     Axios.post('api/chat/uploadfiles', formData,config)
  //     .then()
  // }

 
  return (
<>

    <div className='messages-output' >
      {user && !privateMemberMsg?._id && <div className='alert alert-info'>You are in the {currentRoom} room</div>}
      {user && privateMemberMsg?._id && (
        <>
          <div className='alert alert-info conversation-info'>
           <div>
           Your conversation with {privateMemberMsg.name} <img src={privateMemberMsg.picture} className ='conversation-profile-picture' alt="privatemember" />
           </div>
          </div>
        </>
      )}
      {!user && <div className='alert alert-danger'>please login !!</div> }
      {user &&
       messages.map(({_id:date, messagesByDate},idx)=>
        <div key={idx} >
          <p className='alert alert-info text-center message-date-indicator' >{date}</p>

          {messagesByDate?.map(({content, time ,from:sender}, msgIdx)=>(
            <div className = 'message' key={msgIdx}>
             <div className={sender?.email === user?.email ? 'message':'incoming-message'}  key = {msgIdx} >
               <div className='message-inner' >
                <div className='d-flex align-items-center mb-3'>
                <img src={sender.picture} className ='sender-status-img' alt="sender" />
                   <p className='message-sender' > {sender._id === user?._id ? "You":sender.name} </p>
                 </div>
                 <p className='message-content'>{content}</p>
                 <p className='message-timestamp-left'>{time}</p>
               </div>
             </div> 
            </div>
          ))}
        </div>
      )}
      <div ref={messageEndRef}></div>
    </div>
      <Form onSubmit={handleSubmit} >
        <Row>
          <Col md={11}>
            <Form.Group>
              <Form.Control type="text" placeholder="Your Message" disabled={!user} value={message}  onChange={e=> setMessage(e.target.value)} />
            </Form.Group>
          </Col>
         
          <Col md={1}>
            <Button variant='primary' type='submit' style={{width:'100%',backgroundColor:'orange'}} disabled={!user} >

              <i className='fas fa-paper-plane' ></i>
            </Button>
          </Col>
        </Row>
      </Form>
   
    </>
  )
}

export default MessageForm