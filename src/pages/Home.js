import React from 'react'
import {Row,Col,Button} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import './Home.css'
const Home = () => {
  return (
    <Row>
      <Col md={6} className='d-flex flex-direction-column align-itmes-center justify-content-center' > 
        <div>
          <h1>Share the world with your friends</h1>
          <p> Chat app That lets you connect to the world</p>
          <LinkContainer to='/chat'>
            <Button variant = 'success'>Get started <i className='fas fa-comments home-message-icon'></i></Button>
          </LinkContainer>
        </div>
      </Col>
      <Col nd={6} className="home__bg" ></Col>
    </Row>
  ) 
}

export default Home