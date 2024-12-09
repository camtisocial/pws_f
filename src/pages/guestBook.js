import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet';
import { v4 as uuidv4 } from 'uuid';
import 'leaflet/dist/leaflet.css';
import '../components/HomeButton';
import '../css/guestBook.css';
import HomeButton from '../components/HomeButton';
import SimpleModal from '../components/SimpleModal';

function GuestBook() {
  const [position, setPosition] = useState([40, 0]);
  const [zoom, setZoom] = useState(2);
  const [pinPosition, setPinPosition] = useState(null);
  const [pinMode, setPinMode] = useState(false);
  const [pins, setPins] = useState([]);
  const [userNote, setUserNote] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const mapContainer = document.querySelector('.leaflet-container');

  useEffect(() => {
    const fetchPins = async () => {
      try {
        const response = await fetch('aws-endpoint-url');
        const data = await response.json();
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
        note: userNote,
      };
      /*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
      lambda call
      function savePin(newPin) {}
      @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/
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
      return (
        <Marker key={pin.id} position={[pin.latitude, pin.longitude]}>
          <Popup>{pin.note}</Popup>
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
        <p>Hover over pins in the map to read messages from other visitors, or drop a pin and leave a message of your own!</p>
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
                <Marker position={pinPosition}>
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
