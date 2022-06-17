import React from 'react'
import {Nav,Navbar,Container,NavDropdown, Button} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import {useSelector} from 'react-redux'
import {useLogoutUserMutation} from "../services/appApi"
import logo from '../assets/logos.png'
const Navigation = () => {
  const user  = useSelector( (state)=> state.user )
  const [logoutUser] = useLogoutUserMutation()

  async function handleLogout(e){
      e.preventDefault()
      await logoutUser(user)
      //redirect to home page
      window.location.replace('/')
    }
  return (
    <Navbar bg="light" expand="lg">
    <Container>
      <LinkContainer to= '/'>
      <Navbar.Brand >
          <img src={logo} style={ {width :130, height:60} }/>
      </Navbar.Brand>
      </LinkContainer>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto">
         {!user && (
          <LinkContainer to = '/login' style={{backgroundColor:'#0d6efd' ,color:'white' ,borderRadius:'5px' ,padding:'3', margin:'5px'}}>
          <Nav.Link  >Login</Nav.Link>
          </LinkContainer>
           )} 
          <LinkContainer to = '/chat' style={{borderRadius:'5px', backgroundColor:'white', color:'#0d6efd'}}>
          <Nav.Link >Chat</Nav.Link>
          </LinkContainer>
          {user &&( 
          <NavDropdown title={
            <>
            <img src = {user.picture} style = {{width:30, height:30,marginRight:10,objectFit:'cover',borderRadius:'50%'}}/>
            {user.name}
            </>
          } id="basic-nav-dropdown">
            <LinkContainer to = '/support'>
            <NavDropdown.Item href="">Support</NavDropdown.Item>
           </LinkContainer>
           
            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
            <NavDropdown.Item >
              <Button  variant='danger' onClick={handleLogout}>Logout</Button>
            </NavDropdown.Item>
          </NavDropdown>
          )}
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  )
}

export default Navigation