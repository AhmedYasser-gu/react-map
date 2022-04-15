/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useRef, useState} from 'react';
import './Map.scss';
// props
interface Gmap {
    mapType: google.maps.MapTypeId;
    mapControl?: boolean;
}

type LatLng = google.maps.LatLng;
type GMap = google.maps.Map;

const Map: React.FC<Gmap> = ({ mapType, mapControl: mapTypeControl = false}) => {

    const ref = useRef<HTMLDivElement>(null);
    const [map, setMap] = useState<GMap>();
// calls the defaulyMapStart , when the hook is not empty
    const startMap = (): void => {
        if (!map) {
            defaultMapStart();
        } 
    };
    useEffect(startMap, [map]);
// calls initMap function
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

    const coordinateToAddress = async (coordinate: LatLng) => {
        const geocoder = new google.maps.Geocoder();
        await geocoder.geocode({ location: coordinate}, function (results, status) {
        });
    };
// properties of the map
    const initMap = (zoomLevel: number, address: LatLng): void => {
        if (ref.current) {
            setMap(
                new google.maps.Map(ref.current, {
                    zoom: 14,
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
        <div className="map">
            <div ref={ref} className="map__map"></div>
        </div>
    );
};

export default Map;