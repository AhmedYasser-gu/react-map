import React, {useEffect, useRef, useState} from 'react';
import './Map.scss';

interface IMap {
    mapType: google.maps.MapTypeId;
    mapTypeControl?: boolean;
}

type GoogleLatLng = google.maps.LatLng;
type GoogleMap = google.maps.Map;

const Map: React.FC<IMap> = ({ mapType, mapTypeControl = false}) => {

    const ref = useRef<HTMLDivElement>(null);
    const [map, setMap] = useState<GoogleMap>();

    const startMap = (): void => {
        if (!map) {
            defaultMapStart();
        } 
    };
    useEffect(startMap, [map]);

    const defaultMapStart = (): void => {
        const defaultAddress = new google.maps.LatLng(57.721000, 12.940250);
        initMap(4, defaultAddress);
    };

    const initEventListener = ():void => {
        if (map) {
            google.maps.event.addListener(map, 'click', function(e) {
                coordinateToAddress(e.latLng);
            })
        }
    };
    useEffect(initEventListener, [map]);

    const coordinateToAddress = async (coordinate: GoogleLatLng) => {
        const geocoder = new google.maps.Geocoder();
        await geocoder.geocode({ location: coordinate}, function (results, status) {
        });
    };

    const initMap = (zoomLevel: number, address: GoogleLatLng): void => {
        if (ref.current) {
            setMap(
                new google.maps.Map(ref.current, {
                    zoom: 12,
                    center: address,
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
        <div className="map-container">
            <div ref={ref} className="map-container__map"></div>
        </div>
    );
};

export default Map;