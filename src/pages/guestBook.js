import React, { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet';
import { v4 as uuidv4 } from 'uuid';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import '../components/HomeButton';
import '../css/guestBook.css';
import HomeButton from '../components/HomeButton';
import SimpleModal from '../components/SimpleModal';


//FIX BUG WHERE SETTING PIN OR PRESSING GRAB PIN RESETS MAP

const iconUrls = [
  '/images/yellowPin.png',
  '/images/orangePin.png',
  '/images/bluePin.png',
  '/images/greenPin.png',
  '/images/purplePin.png'
];

const getRandomIconUrl = () => {
  const randomIndex = Math.floor(Math.random() * iconUrls.length);
  return iconUrls[randomIndex];
};

function GuestBook() {
  const [position, setPosition] = useState([40, 0]);
  const [zoom, setZoom] = useState(2);
  const [pinPosition, setPinPosition] = useState(null);
  const [pins, setPins] = useState([]);
  const [userNote, setUserNote] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentColor, setCurrentColor] = useState(null);
  const pinModeRef = useRef(false); 

 let customIcon = L.icon({
  iconUrl: currentColor,
  iconSize: [32, 32],
  iconAnchor: [16, 32], 
  popupAnchor: [0, -32] 

}); const mapContainer = document.querySelector('.leaflet-container');

  useEffect(() => {
    const fetchPins = async () => {
      try {
        const response = await fetch('https://xxn01xl3vl.execute-api.us-east-2.amazonaws.com/guestBook');
        const data = await response.json();
        console.log(data);
        setPins(data);
      } catch (error) {
        console.error('Error fetching pins:', error);
      }
    };

    fetchPins();
  }, []);

  function SetLocalPosition() {
    navigator.geolocation.getCurrentPosition((pos) => {
      const { latitude, longitude } = pos.coords;
      setPosition([latitude, longitude]);
      setZoom(6);
      console.log(`Your position is: ${latitude}, ${longitude}`);
    })
  };

  function SetDefaultPosition() {
    setPosition([40, 0]);
    setZoom(2);
  };

  function SetViewOnPosition({ position, zoom }) {
    const map = useMap();
    useEffect(() => {
      map.flyTo(position, zoom, {
        animate: true,
        duration: 1.5,
      });
    }, [position, zoom, map]);
    return null;
  }

  function AddPin() {
    useMapEvents({
      click(e) {
        if (pinModeRef.current) {
          setCurrentColor(getRandomIconUrl());
          const { lat, lng } = e.latlng;
          setPinPosition([lat, lng]);
          pinModeRef.current = false;
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
    pinModeRef.current = true;
  }

  function handleChange(event) {
    setUserNote(event.target.value);
  }

  function savePinToDb() {
    if (pinPosition && userNote) {
      console.log("note: ", userNote);
      console.log ("pin position: ", pinPosition);
      const newPin = {
        id: uuidv4(),
        latitude: pinPosition[0],
        longitude: pinPosition[1],
        message: userNote,
        color: currentColor,
      }; 

      fetch("https://xxn01xl3vl.execute-api.us-east-2.amazonaws.com/guestBook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPin),
      })

      setPins((prevPins) => [...prevPins, newPin]);
      setPinPosition(null);
      setUserNote('');
    } else if (!pinPosition && !userNote) {
      alert("Missing pin and message.");
    } else if (!pinPosition) {
      alert("Missing Pin.");
    } else if (!userNote) {
      alert("Missing Message.");
    } else {
      alert("An error occurred. Please try again.");
    }
  }

  function displayPins() {
    return pins.map((pin) => {
      const pinIcon = L.icon({
        iconUrl: pin.color,
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32]
      });
      return (
        <Marker key={pin.id} position={[pin.latitude, pin.longitude]} icon={pinIcon}>
          <Popup>{pin.message}</Popup>
        </Marker>
      );
    });
  }

  function handleQuestionClick() {
    setIsModalOpen(true); 
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  return (
    <div className="guestBook">
      <SimpleModal isOpen={isModalOpen} onClose={closeModal}>
        <p>Click on pins in the map to read messages from other visitors, or drop a pin and leave a message of your own</p>
      </SimpleModal>
        <div className="question-mark-wrapper">
          <img className="question-mark" src="/images/questionMark.png" alt="Question Mark" onClick={handleQuestionClick} />
        </div>
        <div className="pin-menu-wrapper">
          <div className="pin-menu">
             <button className="map-button" onClick={SetDefaultPosition}>Default View</button>
             <button className="map-button" onClick={SetLocalPosition}>Local View</button>
             <button className="map-button" onClick={TogglePinMode}>Grab Pin</button>
            <textarea
              className="message-inputz"
              value={userNote}
              onChange={handleChange}
              placeholder="Type your message here..."
            ></textarea>
             <button className="map-button" onClick={savePinToDb}>Save Message</button>
          </div>
         </div> 
        <div className="mw-khrom">
          <div className="page-title">
             <img src="/images/guestText2.png" alt="Guest Text" />
          </div>
       <div className="map-wrapper">
           <MapContainer className="map-container" center={position} zoom={zoom}>
             <TileLayer
               url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
               attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
             />
             {pinPosition && (
                <Marker position={pinPosition} icon={customIcon} >
                   <Popup>
                     {userNote}
                   </Popup>
                </Marker>
             )}
             <SetViewOnPosition position={position} zoom={zoom} />
             <AddPin />
              {displayPins()}
           </MapContainer>
        </div>
        </div>
      <div className="button-container" style={{ position: 'absolute', top: '10px', left: '10px' }}>
        <HomeButton />
      </div>
    </div>
  );
}

export default GuestBook;
