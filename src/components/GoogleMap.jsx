import React from 'react'
import GoogleMapReact from 'google-map-react'

import LocationOnIcon from '@mui/icons-material/LocationOn';
import '../map.css'

require("dotenv").config();

const LocationPin = ({ text }) => (
    <div className="pin">
      <LocationOnIcon className="pin-icon" />
      <p className="pin-text">{text}</p>
    </div>
);

const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

export default function GoogleMap({ location, zoomLevel }) {
    console.log(location)
    return (
    <div className="map">
      <div className="google-map">
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyADtRGdlbPhEihkPp_eOCE-b0XxMLFJnUs' }}
          defaultCenter={location}
          defaultZoom={zoomLevel}
        >
          <LocationPin
            lat={location.lat}
            lng={location.lng}
            text={location.address}
          />
        </GoogleMapReact>
      </div>
    </div>
  )
}