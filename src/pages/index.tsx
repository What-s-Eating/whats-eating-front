import { useEffect, useRef } from "react";
import { Map } from "react-kakao-maps-sdk";

export default function Home() {
  const mapRef = useRef<kakao.maps.Map>(null);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        mapRef.current?.setCenter(
          new kakao.maps.LatLng(
            position.coords.latitude,
            position.coords.longitude
          )
        );
        mapRef.current?.setLevel(5);
      });
    } else {
      alert("위치 정보를 가져올 수 없습니다.");
    }
  };

  useEffect(() => {}, []);

  return (
    <>
      <Map
        ref={mapRef}
        center={{ lat: 33.5563, lng: 126.79581 }}
        style={{ width: "100%", height: "100vh", zIndex: 0 }}
      />
      <button
        className="absolute bottom-3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white border border-gray-300 rounded-full w-13 h-13 py-2 px-4 text-base font-medium"
        onClick={getLocation}
      >
        내 주변
      </button>
    </>
  );
}
