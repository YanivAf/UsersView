import React from 'react';
import { Link } from "react-router-dom";

export default function User() {
  return (
    <div style={{ height: 400, width: '100%' }}>
      <Link to={`/`}>Back to Users View</Link>
    </div>
  );
}