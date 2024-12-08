import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import '../components/HomeButton';
import '../css/guestBook.css';
import HomeButton from '../components/HomeButton';

function GuestBook() {
  const [position, setPosition] = useState([40, 0]);
  const [zoom, setZoom] = useState(2);
  const [pinPosition, setPinPosition] = useState(null);
  const [pinMode, setPinMode] = useState(false);
  const mapContainer = document.querySelector('.leaflet-container');

  function SetLocalPosition() {
    navigator.geolocation.getCurrentPosition((pos) => {
      const { latitude, longitude } = pos.coords;
      setPosition([latitude, longitude]);
      setZoom(5);
      console.log(`Your position is: ${latitude}, ${longitude}`);
    })
  };

  function SetDefaultPosition() {
    setPosition([30, 0]);
    setZoom(2);
  };

  function SetViewOnPosition({ position, zoom }) {
    const map = useMap();
    useEffect(() => {
      map.setView(position, zoom);
    }, [position, zoom, map]);
    return null;
  }

  function AddPin() {
    useMapEvents({
      click(e) {
        if (pinMode) {
          const { lat, lng } = e.latlng;
          setPinPosition([lat, lng]);
          setPinMode(false);
          mapContainer.style.cursor = 'grab';
          console.log(`Marker set at: ${lat}, ${lng}`);
        }
      }
    });
    return null;
  }

  function TogglePinMode() {
    if (mapContainer) {
        mapContainer.style.cursor = 'crosshair';
      }
    setPinMode(true);

  }


  
  return (
    <div className="guestBook">
      <div className="map-wrapper">
         <div className="map-button-container">
           <button className="map-button default-view" onClick={SetDefaultPosition}>Default View</button>
           <button className="map-button user-position" onClick={SetLocalPosition}>Local View</button>
           <button className="map-button grab-pin" onClick={TogglePinMode}>Grab Pin</button>
           <button className="map-button save-message" onClick={null}>Save Message</button>
         </div>
         <MapContainer className="map-container" center={position} zoom={zoom}>
           <TileLayer
             url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
             attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
           />
           {pinPosition && (
              <Marker position={pinPosition}>
                 <Popup>
                   A pretty CSS3 popup. <br /> Easily customizable.
                 </Popup>
              </Marker>
           )}
           <SetViewOnPosition position={position} zoom={zoom} />
           <AddPin />
         </MapContainer>
         </div>
      <div className="button-container" style={{ position: 'absolute', top: '10px', left: '10px' }}>
        <HomeButton />
      </div>
    </div>
  );
}

export default GuestBook;
