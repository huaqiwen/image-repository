import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import AuthProvider from './contexts/AuthContext';

import ImageGrid from './comps/home/ImageGrid';
import Modal from './comps/home/Modal';
import Title from './comps/home/Title';
import UploadForm from './comps/home/UploadForm';
import Signup from './comps/authorization/Signup';
import Login from './comps/authorization/Login';
import Navigation from './comps/home/Navigation';

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
                <Navigation />
                <div className="main-grid">
                  <Title />
                  <UploadForm />
                  <ImageGrid setSelectedImg={setSelectedImg} className="main-grid" />
                </div>
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
