import React, { useState, useEffect, useRef } from "react";
import { GoogleMap as GoogleMaps, Marker } from "@react-google-maps/api";
interface Store {
  id: string;
  latitude: number;
  longitude: number;
}
interface coordinatesData {
  lat: number;
  lng: number;
}
interface MarkerData {
  id: 0;
  position: coordinatesData;
}
type StoreArray = Store[];
interface CustomWindow extends Window {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  google: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  googleMap?: any;
}

declare let window: CustomWindow;
const GoogleMap = ({
  coordinates,
  storeCoordinates,
  setActiveMarker,
  activeMarker,
  mapStyles,
  mapIcon,
}: {
  coordinates: coordinatesData;
  storeCoordinates: StoreArray;
  setActiveMarker: any;
  activeMarker: any;
  mapStyles?: any;
  mapIcon?: string;
}) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [markers, setMarkers] = useState<any[]>([]);
  const [marker, setMarker] = useState<MarkerData[]>([]);
  const directionsRenderer = useRef<google.maps.DirectionsRenderer | null>(
    null
  );
  const directionsService = useRef<google.maps.DirectionsService | null>(null);
  useEffect(() => {
    directionsRenderer.current = new window.google.maps.DirectionsRenderer();
    directionsService.current = new window.google.maps.DirectionsService();
  }, []);
  {
  }
  useEffect(() => {
    setMarkers(
      storeCoordinates?.map((store: Store, index: number) => {
        return {
          id: store?.id,
          position: { lat: store.latitude, lng: store.longitude },
          onClick: () => handleMarkerClick(store),
          label: `${index + 1}`,
          icon: {
            url:
              mapIcon || "https://img.icons8.com/?size=512&id=63257&format=png",
            scaledSize: new window.google.maps.Size(40, 40),
            anchor: new window.google.maps.Point(40, 40),
          },
          animation:
            activeMarker &&
            activeMarker?.id == store?.id &&
            window.google.maps.Animation.BOUNCE,
        };
      })
    );
  }, [storeCoordinates]);
  useEffect(() => {
    setMarker(
      [coordinates].map((store: coordinatesData) => ({
        id: 0,
        position: { lat: store.lat, lng: store.lng },
      }))
    );
  }, [coordinates]);
  const handleMarkerClick = (store: Store) => {
    setActiveMarker(store);
    const element = document.getElementById(`google_map_store_${store?.id}`);
    if (element) {
      const scrollStartTime = performance.now();
      window.scrollTo({
        top: element.offsetTop,
        behavior: "smooth",
      });
      element.setAttribute("tabindex", "-1");
      const focusAfterScroll = () => {
        const scrollEndTime = performance.now();
        const scrollDuration = scrollEndTime - scrollStartTime;
        const focusDelay = Math.max(0, 1000 - scrollDuration);
        setTimeout(() => {
          element.focus();
        }, focusDelay - 300);
        window.removeEventListener("scroll", focusAfterScroll);
      };
      window.addEventListener("scroll", focusAfterScroll);
    }
  };
  return (
    <div style={{ padding: "55px 10px 20px 0" }}>
      <div id="google-map">
        <GoogleMaps
          mapContainerStyle={mapStyles}
          center={coordinates}
          zoom={9}
          onLoad={(map) => {
            window.googleMap = map;
          }}
        >
          {/* Display markers */}
          {markers?.map((marker) => (
            <Marker
              key={marker.id}
              position={marker.position}
              onClick={marker.onClick}
              label={{
                color: "white",
                fontSize: "16px",
                className: "",
                text: marker.label,
              }}
              icon={marker.icon}
              {...(activeMarker &&
                activeMarker?.id === marker?.id && {
                  animation: window.google.maps.Animation.BOUNCE,
                })}
            />
          ))}
          {/* Display markers with valid position */}
          {marker?.map(() => (
            <></>
          ))}
          {/* Display Marker for 'coordinates' prop */}
          <Marker position={{ lat: coordinates.lat, lng: coordinates.lng }} />
        </GoogleMaps>
      </div>
    </div>
  );
};

export default GoogleMap;
