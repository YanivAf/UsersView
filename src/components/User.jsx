import React from 'react';
import { useNavigate, useParams } from "react-router-dom";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";

import ArrowBackIcon from '@mui/icons-material/ArrowBack';


export default function User() {
  const navigate = useNavigate();
  const params = useParams();

  const allRows = JSON.parse(localStorage.getItem('allRows')) ?
  JSON.parse(localStorage.getItem('allRows')) :
  [];
  const userFullName = params.userFullName.replaceAll('-', ' ');
  const viewedUser = allRows.find(row => row.fullName === userFullName);

  return (
    <>
    {
      (allRows.length === 0 || !viewedUser) ?
      navigate('/users') :
      <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
        <Typography variant="h2" align="center">
          User Details
        </Typography>
        <Card sx={{ width: "80vw", minWidth: 250, maxWidth: 800, m: 1 }}>
        <CardActions sx={{ justifyContent: "flex-end" }}>
          <IconButton
            size="large"
            aria-label="back"
            href={'/users'}
          >
            <ArrowBackIcon />
          </IconButton>
        </CardActions>
        <CardMedia
          component="img"
          sx={{ objectPosition: "50% 25%", height: "30vw", minHeight: 140 }}
          image={viewedUser.picture.srcL}
          alt={viewedUser.picture.alt}
          title={viewedUser.picture.alt}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {viewedUser.fullName}
          </Typography>
          <Typography variant="body1">
            Email: {viewedUser.email}
          </Typography>
          <Typography variant="body2">
            Gender: {viewedUser.gender}
          </Typography>
          <Typography variant="body2">
            Age: {viewedUser.age}
          </Typography>
          <Typography variant="body2">
            Address: {`${viewedUser.location.street.number} ${viewedUser.location.street.name} St., ${viewedUser.location.state}, ${viewedUser.location.country}`}
          </Typography>
        </CardContent>
      </Card>
      <p>{`https://www.google.com/maps/search/?api=1&query=${viewedUser.location.coordinates.latitude}${viewedUser.location.coordinates.longitude}`}</p>
    </div>
    }
    </>
  );
}