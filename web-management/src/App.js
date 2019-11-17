import React from 'react';

import Header from './components/Header';

import HomePage from './pages/HomePage';
import ExportPage from './pages/ExportPage';
import CheckPage from './pages/CheckPage';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

function App() {
  return (
    <Router>
      <>
        <div style={{ marginBottom: 40, marginTop: 30, textAlign: 'center' }}>
          <Header />
        </div>

        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>
          <Route path="/check">
            <CheckPage />
          </Route>
          <Route path="/export">
            <ExportPage />
          </Route>
        </Switch>

      </>
    </Router>
  );
}

export default App;
