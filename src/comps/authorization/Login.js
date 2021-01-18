import React, { useRef, useState } from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export default function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();

    // Login states
    const { currentUser, login } = useAuth();
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const history = useHistory();

    async function handleLogin(e) {
        e.preventDefault();

        try {
            setError('');
            setSuccess(false);
            setLoading(true);
            await login(emailRef.current.value, passwordRef.current.value);
            setSuccess(true);

            await new Promise(r => setTimeout(r, 1000));

            // login success, go home
            history.push("/home");
        } catch (err) {
            console.log(err);
            setError(err.message);
            setSuccess(false);
        }
        setLoading(false);
    }

    return (
        <div>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Log In</h2>

                    {error && <Alert variant="danger">{error}</Alert>}
                    {success && <Alert variant="success">Hello! {currentUser.displayName}.</Alert>}

                    <Form onSubmit={handleLogin}>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required />
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" ref={passwordRef} required />
                        </Form.Group>

                        <Button disabled={loading} className="w-100" type="submit">Log In</Button>
                    </Form>
                </Card.Body>
            </Card>

            <div className="w-100 text-center mt-2">
                Need an account? <Link to="/signup">Sign Up</Link>
            </div>
        </div>
    )
}
