import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import AuthProvider from './contexts/AuthContext';

import ImageGrid from './comps/ImageGrid';
import Modal from './comps/Modal';
import Title from './comps/Title';
import UploadForm from './comps/UploadForm';
import Signup from './comps/Signup';
import Login from './comps/Login';

function App() {
  const [selectedImg, setSelectedImg] = useState(null);

  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Switch>

            <Route exact path="/">
              <Redirect to="/home" />
            </Route>

            <Route path="/home" render={() => 
              <>
                <Title />
                <UploadForm />
                <ImageGrid setSelectedImg={setSelectedImg} />
                { selectedImg && <Modal selectedImg={selectedImg} setSelectedImg={setSelectedImg} /> }
              </>
            } />

            <Route path="/signup" render={() =>
              <>
                <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
                  <div className="w-100" style={{ maxWidth: "400px" }}>
                    <Signup />
                  </div>
                </Container>
              </>
            } />

            <Route path="/login" render={() =>
              <>
                <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
                  <div className="w-100" style={{ maxWidth: "400px" }}>
                    <Login />
                  </div>
                </Container>
              </>
            } />

          </Switch>
        </AuthProvider>
      </Router>

    </div>
  );
}

export default App;
