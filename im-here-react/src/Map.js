/*global kakao*/

"use strict";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import imhere from "./assets/marker1.png";
import axios from "axios";
import Share from "./Share";
import "./assets/Location.css";

const Map = () => {
  const [status, setStatus] = useState(null);
  const [isloading, setIsLoading] = useState(false);
  const [mymap, setMyMap] = useState([]);
  const resetRef = useRef(null);

  useEffect(() => {
    kakaoMap();
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
    const position = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });

    setStatus("입니다!");
    return {
      lon: position.coords.longitude,
      lat: position.coords.latitude,
    };
  };

  //좌표 위치대로 지도 변경
  const displayLoc = (lat, lon) => {
    const locPosition = new kakao.maps.LatLng(lat, lon);

    //마커 이미지
    let imageSrc = `${imhere}`,
      imageSize = new kakao.maps.Size(70, 90),
      imageOption = { offset: new kakao.maps.Point(27, 100) };

    const markerImage = new kakao.maps.MarkerImage(
        imageSrc,
        imageSize,
        imageOption
      ),
      markerPosition = new kakao.maps.LatLng(lat, lon);

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
    displayLoc(lat, lon);

    const response = await axios.get(
      `http://api.iam-here.site/location?x=${lon}&y=${lat}`
    );
    setMyMap(response.data.data);
    setIsLoading(true);
  };

  return (
    <>
      <Background>
        <Container>
          <Title>
            <h5>here</h5>
            <svg
              height="1"
              width="249"
              style={{ backgroundColor: "#707070" }}
            ></svg>
          </Title>
          <Content>
            <h3>
              현재 내 위치는...🏃🏃‍♀️
              <br />
              {mymap.roadAddress} <br />
              {mymap.w3w}
              {/* {mymap.location.latitude}, {mymap.location.longitude} */}
              <br />
              <br />
            </h3>

            <Maps id="map" />
            {isloading && <Share mymap={mymap} />}
          </Content>
        </Container>
      </Background>
    </>
  );
};

const Background = styled.div`
  border: 1px solid red;
  width: 414px;
  height: 896px;
  margin: 30px;
`;

const Container = styled.div`
  margin-left: 40px;
  margin-right: 40px;
  margin-top: 25px;
`;

const Title = styled.div`
  font-size: 30px;
  display: grid;
  grid-template-columns: 1fr 2fr;
  align-items: center;
  font-family: "Poppins", sans-serif;
`;

const Content = styled.div`
  margin-left: 18px;
`;
const Maps = styled.div`
  width: 300px;
  height: 450px;
  border-radius: 25px;
  box-shadow: 3px 3px 15px #e6e6e6;
  margin-top: 10px;
`;

export default Map;
