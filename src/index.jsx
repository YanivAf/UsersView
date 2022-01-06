import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import { Routes, Route, Link, BrowserRouter as Router } from "react-router-dom";

import UsersView from "./UsersView";
import User from "./components/User";
import PoppingAppBar from "./components/PoppingAppBar";

ReactDOM.render(
  <>
  <PoppingAppBar />
  <Router>
    <Routes>
      <Route path="/users" element={<UsersView />} />
      <Route path="/users/:userFullName" element={<User />} />
      <Route path="*" element={
        <p>
          {<Link to="users">Go to Users View!</Link>}
        </p>
      } />
    </Routes>
  </Router>
  </>,
  document.getElementById('root')
);

reportWebVitals();
