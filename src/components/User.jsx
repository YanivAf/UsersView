import React from 'react';
import { useNavigate, useParams } from "react-router-dom";

import GoogleMap from "./GoogleMap";

import Card from "@mui/material/Card";
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import Collapse from '@mui/material/Collapse';
import IconButton from "@mui/material/IconButton";

import { styled } from '@mui/material/styles';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function User() {
  const navigate = useNavigate();
  const params = useParams();

  const allRows = JSON.parse(localStorage.getItem('allRows')) ?
  JSON.parse(localStorage.getItem('allRows')) :
  [];
  const userFullName = params.userFullName.replaceAll('-', ' ');
  const viewedUser = allRows.find(row => row.fullName === userFullName);

  const location = {
    address: `${viewedUser.location.street.number} ${viewedUser.location.street.name} St., ${viewedUser.location.state}, ${viewedUser.location.country}`,
    lat: Number(viewedUser.location.coordinates.latitude),
    lng: Number(viewedUser.location.coordinates.longitude)
  }

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <>
    {
      (allRows.length === 0 || !viewedUser) ?
      navigate('/users') :
      <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
        <Typography variant="h2" align="center">
          User Details
        </Typography>
        <Card sx={{ width: "80vw", minWidth: 200, maxWidth: 300, m: 1 }}>
          <CardHeader
          action={
            <IconButton
              size="large"
              aria-label="back"
              href={'/users'}>
              <ArrowBackIcon />
            </IconButton>
          }
          title={viewedUser.fullName}
          subheader={viewedUser.email}
        />
        <CardMedia
          component="img"
          sx={{ objectPosition: "50% 25%", minHeight: 140 }}
          image={viewedUser.picture.srcL}
          alt={viewedUser.picture.alt}
          title={viewedUser.picture.alt}
        />
        <CardContent>
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
        <CardActions disableSpacing sx={{ display:'flex', flexDirection:'column', alignItems:'flex-end' }}>
          <Typography variant="body2">View Map</Typography>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more">
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <GoogleMap location={location} zoomLevel={5} />
          </CardContent>
        </Collapse>
      </Card>
    </div>
    }
    </>
  );
}