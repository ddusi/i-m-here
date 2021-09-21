/*global kakao*/
"use strict";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import imhere from "./assets/marker.png";

const Map = () => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [status, setStatus] = useState(null);
  const [mapdata, setMapdata] = useState(null);

  useEffect(() => {
    //지도를 담은 container
    let container = document.getElementById("map");
    //지도 option 설정
    let options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 2,
    };

    //지도 생성, 객체 리턴
    let map = new kakao.maps.Map(container, options);
    setMapdata(map);
  }, []);

  // eslint-disable-next-line

  const getLocation = async () => {
    if (!navigator.geolocation) {
      setStatus("현재 브라우저에서 위치 정보가 지원되지 않습니다.");
      return;
    }
    setStatus("위치 찾는중...");
    const position = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
    let lat = position.coords.latitude
    let lon = position.coords.longitude
    return {
      lon: position.coords.longitude,
      lat: position.coords.latitude,
    };
 };

  const displayLoc = (latitude, longitude) => {
    const locPosition = new kakao.maps.LatLng(latitude, longitude);
    //마커 이미지
    let imageSrc = `${imhere}`,
      imageSize = new kakao.maps.Size(70, 90),
      imageOption = { offset: new kakao.maps.Point(27, 100) };

    let markerImage = new kakao.maps.MarkerImage(
        imageSrc,
        imageSize,
        imageOption
      ),
      markerPosition = new kakao.maps.LatLng(latitude, longitude);

    let marker = new kakao.maps.Marker({
      position: markerPosition,
      image: markerImage,
    });

    mapdata.setCenter(locPosition);
    marker.setMap(mapdata);
  };

  const onLocation = async () => {
    let { lat, lon } = await getLocation();
    console.log(lat, lon);
    displayLoc(lat, lon)
  };

  return (
    <>
      <h3>{status}</h3>
      <Maps id="map" />
      <button onClick={onLocation}>여기로~</button>
      <div>{longitude && <p>경도: {longitude}</p>}</div>
      <div>{latitude && <p>위도: {latitude}</p>}</div>
    </>
  );
};

const Maps = styled.div`
  width: 400px;
  height: 400px;
`;

export default Map;
