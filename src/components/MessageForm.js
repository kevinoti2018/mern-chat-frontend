import React from 'react'
import {Button, Form, Col, Row} from 'react-bootstrap'
import {useSelector} from 'react-redux'
import './MessageForm.css'
const MessageForm = () => {
  function handleSubmit(e){
    e.preventDefault()
  }
  const user = useSelector((state)=>state.user)
  return (
<>

    <div className='messages-output' >
      {!user && <div className='alert alert-danger'>please login !!</div> }
    </div>
      <Form onSubmit={handleSubmit} >
        <Row>
          <Col md={11}>
            <Form.Group>
            <Form.Control type="email" placeholder="Your Message" disabled={!user} />
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