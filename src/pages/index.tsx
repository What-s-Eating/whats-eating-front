import { useEffect, useRef, useState } from "react";
import { Map, CustomOverlayMap } from "react-kakao-maps-sdk";
import { debounce } from "lodash";
import { SearchClient } from "../utils/fetcher";
import { Place } from "@/types/place";
import Link from "next/link";
import { useRouter } from "next/router";

const defaultCenter = {
  lat: 37.5665,
  lng: 126.978,
};

export default function Home() {
  const router = useRouter();
  const mapRef = useRef<kakao.maps.Map>(null);
  const [center, setCenter] = useState<kakao.maps.LatLng>();
  const [markers, setMarkers] = useState<Place[]>([]);
  const updateCenter = debounce((map: kakao.maps.Map) => {
    setCenter(map.getCenter());
  }, 1000);

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

  useEffect(() => {
    SearchClient(
      `/kakao/coordinate_search?x=${
        center ? center.getLng() : defaultCenter.lng
      }&y=${center ? center.getLat() : defaultCenter.lat}`
    ).then(res => {
      setMarkers(res.data.result);
    });
  }, [center]);

  return (
    <>
      <Map
        ref={mapRef}
        onCenterChanged={(target: kakao.maps.Map) => {
          updateCenter(target);
        }}
        center={defaultCenter}
        style={{ width: "100%", height: "100vh", zIndex: 0 }}
      >
        {markers.map((marker, idx) => (
          <CustomOverlayMap
            key={idx}
            position={{
              lat: Number(marker.y),
              lng: Number(marker.x),
            }}
            yAnchor={1.5}
          >
            <button
              onClick={() => {
                router.push(`/detail/${marker.id}`);
              }}
              className="bg-white border border-gray-300 rounded-lg w-fit h-fit py-1 px-3 text-base font-medium relative"
            >
              <div className="text-sm font-bold">{marker.place_name}</div>

              {/* bottom arrow */}
              <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6">
                <svg
                  className="w-full h-full"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ transform: "rotate(180deg)" }}
                >
                  <path
                    d="M12 5L4 15H20L12 5Z"
                    fill="#FFFFFF"
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </button>
          </CustomOverlayMap>
        ))}
      </Map>
      <button
        className="absolute bottom-3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white border border-gray-300 rounded-full w-13 h-13 py-2 px-4 text-base font-medium"
        onClick={getLocation}
      >
        내 주변
      </button>
    </>
  );
}
