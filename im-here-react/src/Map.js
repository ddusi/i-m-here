/*global kakao*/

"use strict";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import imhere from "./assets/marker.png";

const Map = () => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [status, setStatus] = useState(null);
  const [mapdata, setMapdata] = useState(null);
  const resetRef = useRef(null);

  useEffect(() => {
    console.log("컴포넌트 마운트");
    kakaoMap();
    console.log(resetRef);
    onLocation();
    return () => {
      console.log("컴포넌트가 사라짐.");
    };
  }, []);

  const kakaoMap = () => {
    //지도를 담은 maps
    let maps = document.getElementById("map");

    //지도 option 설정
    let options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 2,
    };

    //지도 생성
    resetRef.current = new kakao.maps.Map(maps, options);
  };

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

    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let LatLon = [lat, lon];
    setStatus(LatLon);
    return {
      lon: position.coords.longitude,
      lat: position.coords.latitude,
    };
  };

  //좌표 위치대로 지도 변경
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
    resetRef.current.setCenter(locPosition);
    marker.setMap(resetRef.current);
  };

  //위치 찾기 버튼
  const onLocation = async () => {
    let { lat, lon } = await getLocation();
    console.log(lat, lon);
    displayLoc(lat, lon);
  };

  return (
    <>
      <h3>
        현재 내 위치는...
        <br />
        {status}
      </h3>
      <Maps id="map" />
      <Button onClick={onLocation}>위치 찾기</Button>
    </>
  );
};

const Maps = styled.div`
  width: 400px;
  height: 400px;
  border-radius: 25px;
  box-shadow: 3px 3px 15px #e6e6e6;
`;

const Button = styled.button`
  background: #e3e3e3;
  position: relative;
  bottom: 410px;
  left: 300px;
  z-index: 1;
  border: none;
  border-radius: 1em;
  padding: 10px 20px 10px 20px;
  font-weight: bold;
  box-shadow: 1px 1px 3px #e6e6e6;

  &: hover {
    background: #dbdbdb;
  }
`;

export default Map;
