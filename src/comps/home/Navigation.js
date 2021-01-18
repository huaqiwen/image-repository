import React from 'react'
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

export default function Navigation() {
    const { currentUser, logout } = useAuth();
    const history = useHistory();

    async function handleLogout() {
        try {
            await logout();
            history.push("/home");
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="w-100 navigation">
            <Navbar bg="light" expand="lg">
            <Navbar.Brand as={Link} to="/home">Image Repository</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Form inline>
                        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                        <Button variant="outline-info">Search</Button>
                    </Form>
                </Nav>

                {currentUser && <Button variant="outline-danger" onClick={handleLogout}>Log Out</Button>}
                {!currentUser && <Button variant="light" as={Link} to="/login">Log In</Button>}
                {!currentUser && <Button variant="light" as={Link} to="/signup">Sign Up</Button>}
            </Navbar.Collapse>
            </Navbar>
        </div>
    )
}
