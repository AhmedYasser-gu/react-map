import React, {useEffect, useState} from 'react';
import './App.css';
import Map from './Map/';
import {loadMapApi} from "./utils/GoogleMapsUtils";

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

    return (
        <div className="App">
          <p><strong>Map project</strong></p>
            {scriptLoaded && (
                <Map
                  mapType={google.maps.MapTypeId.ROADMAP}
                  mapControl={true}
                />
            )}
        </div>
    );
}

export default App;