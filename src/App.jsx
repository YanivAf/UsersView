import React from 'react';
import { Routes, Route, Link } from "react-router-dom";

import UsersView from "./components/UsersView";
import User from "./components/User";

export default function App() {
  return (
      <Routes>
        <Route path="/" element={<UsersView />} />
        <Route path="/user/*" element={<User />} />
        <Route path="*" element={
          <p>
            Ummm... We didn't find what you were looking for.{" "}{<Link to="/">Back to Users View</Link>}
          </p>
        } />
      </Routes>
  );
}