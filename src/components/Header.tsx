// @ts-nocheck

import React, { useState } from 'react'
import {
  Nav, Navbar, NavbarBrand, NavbarToggler, Collapse, NavItem, Jumbotron,
  Button, Modal, ModalHeader, ModalBody,
  Form, FormGroup, Input, Label,
} from 'reactstrap'
import { NavLink } from 'react-router-dom'

function Header ({ props }) {
  const [isNavOpen, setIsNavOpen] = useState(false)
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false)
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false)
  const toggleNav = () => {
    setIsNavOpen(!isNavOpen)
  }

  const toggleSignUpModal = () => {
    setIsSignUpModalOpen(!setIsSignUpModalOpen)
  }

  const toggleSignInModal = () => {
    setIsSignInModalOpen(!isSignInModalOpen)
  }

  const handleSignup = (event) => {
    toggleSignUpModal()
    props.signupUser({
      username: this.username.value,
      password: this.password.value,
      firstname: this.firstname.value,
      lastname: this.lastname.value,
    })
    event.preventDefault()
  }

  const handleLogin = (event) => {
    toggleSignInModal()
    props.loginUser({
      username: this.username.value,
      password: this.password.value,
      remember: this.remember.checked,
    })
    event.preventDefault()
  }

  const handleLogout = () => {
    props.logoutUser()
  }
  return (
    <div>
      <div className="BLM">
        Black Lives Matter.&nbsp;
        <a target="_blank" rel="noopener noreferrer" href="https://support.eji.org/give/153413/#!/donation/checkout">
          Support the Equal Justice Initiative.
        </a>
      </div>
      <Navbar dark expand="md">
        <div className="container">
          <NavbarToggler onClick={toggleNav} />
          <NavbarBrand className="mr-auto" href="/">
            <img src="logo.png" height="30" width="41" alt="Ristorante Con Fusion" />
          </NavbarBrand>
          <Collapse isOpen={isNavOpen} navbar>
            <Nav navbar>
              <NavItem>
                <NavLink className="nav-link" to="/home">
                  <span className="fa fa-home fa-lg" />
										&nbsp;Home
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="nav-link" to="/menu">
                  <span className="fa fa-list fa-lg" />
										&nbsp;Menu
                </NavLink>
              </NavItem>
              {/*<NavItem>*/}
              {/*	<NavLink className="nav-link" to="/favorites">*/}
              {/*		<span className="fa fa-heart fa-lg"></span>*/}
              {/*		&nbsp;My Favorites*/}
              {/*	</NavLink>*/}
              {/*</NavItem>*/}
              <NavItem>
                <NavLink className="nav-link" to="/contactus">
                  <span className="fa fa-address-card fa-lg" />
										&nbsp;Contact Us
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="nav-link" to="/aboutus">
                  <span className="fa fa-info fa-lg" />
										&nbsp;About Us
                </NavLink>
              </NavItem>
            </Nav>
            <Nav className="ml-auto" navbar>
              <NavItem>
                { !props.auth.isAuthenticated
                  ?										(
                    <div>
                      <Button outline onClick={toggleSignInModal}>
                        <span className="fa fa-sign-in fa-lg" />
													&nbsp;Login
                        {props.auth.isFetching
                          ?													<span className="fa fa-spinner fa-pulse fa-fw" />
                          :													null}
                      </Button>
												&nbsp;&nbsp;&nbsp;&nbsp;
                      <Button outline onClick={toggleSignUpModal}>
                        <span className="fa fa-user-plus fa-lg" />
													&nbsp;SignUp
                        {props.auth.isFetching
                          ?													<span className="fa fa-spinner fa-pulse fa-fw" />
                          :													null}
                      </Button>
                    </div>
                  )
                  :										(
                    <div>
                      <div className="navbar-text mr-3">
                        {props.auth.user.username}
                      </div>
                      <Button outline onClick={handleLogout}>
                        <span className="fa fa-sign-out fa-lg" />
													&nbsp;Logout
                        {
                          props.auth.isFetching
                            ?														<span className="fa fa-spinner fa-pulse fa-fw" />
                            :														null
                        }
                      </Button>
                    </div>
                  )}
              </NavItem>
            </Nav>
          </Collapse>
          <Modal isOpen={isSignUpModalOpen} toggle={toggleSignUpModal}>
            <ModalHeader toggle={toggleSignUpModal}>SignUp</ModalHeader>
            <ModalBody>
              <Form onSubmit={handleSignup}>
                <FormGroup>
                  <Label htmlFor="username">Username</Label>
                  <Input
                    type="text"
                    id="username"
                    name="username"
                    innerRef={(input) => this.username = input}
                  />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    type="password"
                    id="password"
                    name="password"
                    innerRef={(input) => this.password = input}
                  />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="firstname">First Name</Label>
                  <Input
                    type="text"
                    id="firstname"
                    name="firstname"
                    innerRef={(input) => this.firstname = input}
                  />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="lastname">Last Name</Label>
                  <Input
                    type="text"
                    id="lastname"
                    name="lastname"
                    innerRef={(input) => this.lastname = input}
                  />
                </FormGroup>
                <Button type="submit" value="submit" color="primary">
                  SignUp
                </Button>
              </Form>
            </ModalBody>
          </Modal>
          <Modal isOpen={isSignInModalOpen} toggle={toggleSignInModal}>
            <ModalHeader toggle={toggleSignInModal}>Login</ModalHeader>
            <ModalBody>
              <Form onSubmit={handleLogin}>
                <FormGroup>
                  <Label htmlFor="username">Username</Label>
                  <Input
                    type="text"
                    id="username"
                    name="username"
                    innerRef={(input) => this.username = input}
                  />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    type="password"
                    id="password"
                    name="password"
                    innerRef={(input) => this.password = input}
                  />
                </FormGroup>
                <FormGroup check>
                  <Label check>
                    <Input
                      type="checkbox"
                      name="remember"
                      innerRef={(input) => this.remember = input}
                    />
                    Remember me
                  </Label>
                </FormGroup>
                <Button type="submit" value="submit" color="primary">
                  Login
                </Button>
              </Form>
            </ModalBody>
          </Modal>
        </div>
      </Navbar>
      <Jumbotron>
        <div className="container">
          <div className="row row-header">
            <div className="col-12 col-sm-6">
              <h1>Ristorante con Fusion</h1>
              <p>
                We take inspiration from the World&apos;s best cuisines, and create a unique fusion
                experience. Our lipsmacking creations will tickle your culinary senses!
              </p>
            </div>
          </div>
        </div>
      </Jumbotron>
    </div>
  )
}

export default Header
