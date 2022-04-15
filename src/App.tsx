import React, {useEffect, useState} from 'react';
import './App.css';
import Map from './Map/';
import {loadMapApi} from "./utils/GoogleMapsUtils";

function App() {
    const [scriptLoaded, setScriptLoaded] = useState(false);

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
                  mapTypeControl={true}
                />
            )}
        </div>
    );
}

export default App;