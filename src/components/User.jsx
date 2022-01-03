import React from 'react';
import { Link, useNavigate, useParams } from "react-router-dom";

export default function User() {
  const navigate = useNavigate();
  const params = useParams();
  
  const allRows = JSON.parse(localStorage.getItem('allRows')) ?
  JSON.parse(localStorage.getItem('allRows')) :
  [];
  const userFullName = params.userFullName.replaceAll('-', ' ');
  const viewedUser = allRows.find(row => row.fullName === userFullName);
  console.log(viewedUser)
  return (
    <>
    {
      (allRows.length === 0 || !viewedUser) ?
      navigate('/users') :
      <div style={{ height: 400, width: '100%' }}>
        <Link to={`/users`}>Back to Users View</Link>
      </div>
    }
    </>
  );
}