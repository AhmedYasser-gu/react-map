import React, { useEffect, useState } from 'react';
import './App.css';
import Map from './Map/';
import { loadMapApi } from "./utils/GoogleMapsUtils";

// prints in the console the user current latitude and longitude
 navigator.geolocation.getCurrentPosition(function (position) {
  console.log("Latitude is :", position.coords.latitude);
  console.log("Longitude is :", position.coords.longitude);
});

function App() {
  // hook to render the map , make sure its loaded
  const [scriptLoaded, setScriptLoaded] = useState(false);
  // runs when the App is mounted
  useEffect(() => {
    const googleMapScript = loadMapApi();
    googleMapScript.addEventListener('load', function () {
      setScriptLoaded(true);
    });
  }, []);
  function Random() {

    alert('Taking you somewhere Random on the map!');
  }
  function Home() {

    alert('Back Home!');
  }

  return (
    <div className="App">
      <p><strong>Map project</strong></p>
      {scriptLoaded && (
        <Map
          mapType={google.maps.MapTypeId.ROADMAP}
          mapControl={true}
        />
      )}
      <button id="button1" onClick={Random}> Teleport me to somewhere random </button>

      <button id="button2" onClick={Home}> Bring me back home </button>
      <p> Latitude: {} | Longitude : {} </p>

    </div>
  );
}

export default App;
