import React, { useEffect, useRef, useState } from 'react';
import './Map.scss';
// props
interface Gmap {
    mapType: google.maps.MapTypeId;
    mapControl?: boolean;
}

interface IMarker {
    address: string;
    latitude: number;
    longitude: number;
}
type LatLng = google.maps.LatLng; 
type GMap = google.maps.Map;
type GoogleMarker = google.maps.Marker;

const Map: React.FC<Gmap> = ({ mapType, mapControl: mapTypeControl = false }) => {

    const ref = useRef<HTMLDivElement>(null);
    const [map, setMap] = useState<GMap>();
    const [marker, setMarker] = useState<IMarker>();
    const [homeMarker] = useState<GoogleMarker>();
    const [setGoogleMarkers] = useState<GoogleMarker[]>([]);
    const defaultAddress = new google.maps.LatLng(57.721000, 12.940250);
    const [listenerIdArray, setListenerIdArray] = useState<any[]>([]);
    // calls the defaulyMapStart , when the hook is not empty
    const startMap = (): void => {
        if (!map) {
            defaultMapStart();
        }
    };

    useEffect(startMap, [map]);

    // calls initMap function
    const defaultMapStart = (): void => {
        initMap(4, defaultAddress);
    };

    const initEventListener = (): void => {
        if (map) {
            google.maps.event.addListener(map, 'click', function (e) {
                coordinateToAddress(e.latLng);
            })
        }
    };
    
    useEffect(initEventListener, [map]);

    const coordinateToAddress = async (coordinate: LatLng) => {
        const geocoder = new google.maps.Geocoder();
        await geocoder.geocode({ location: coordinate }, function (results, status) {
            if (status === 'OK') {
                setMarker({
                    address: results[0].formatted_address,
                    latitude: coordinate.lat(),
                    longitude: coordinate.lng()
                })
            }
        });
    };

    useEffect(() => {
        if (marker) {
            addMarker(new google.maps.LatLng(marker.latitude, marker.longitude));
        }
    });

    const addMarker = (location: typeof defaultAddress): void => {
        const marker: GoogleMarker = new google.maps.Marker({
            position: location,
            map: map,
        });

        setListenerIdArray(listenerIdArray => [...listenerIdArray,]);
    };

    useEffect(() => {
        listenerIdArray.forEach((listenerId) => {
            google.maps.event.removeListener(listenerId);
        });
    }, []);
    // properties of the map
    const initMap = (zoomLevel: number, YOUR_LATITUDE: LatLng): void => {
        if (ref.current) {
            setMap(
                new google.maps.Map(ref.current, {
                    zoom: 14,
                    center: YOUR_LATITUDE,
                    mapTypeControl: mapTypeControl,
                    streetViewControl: true,
                    rotateControl: true,
                    scaleControl: true,
                    fullscreenControl: true,
                    panControl: false,
                    zoomControl: true,
                    gestureHandling: 'cooperative',

                    mapTypeId: mapType,
                    draggableCursor: 'pointer',
                })
            );
        }
    };

    return (
        <div className="map">
            <div ref={ref} className="map__map"></div>
        </div>
    );
};

export default Map;
