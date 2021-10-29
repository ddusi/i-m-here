/*global kakao*/

"use strict";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import imhere from "./assets/hw-icon_kakaoapi.png";
import axios from "axios";
import Share from "./Share";
import "./assets/Location.css";
import back_icon from "./assets/hw-icon_back@2x.png";
import refresh_icon from "./assets/hw-icon_refresh@2x.png";
import img_112 from "./assets/hw-img_112.png";
import img_119 from "./assets/hw-img_119.png";

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
      imageSize = new kakao.maps.Size(120, 90),
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
      `https://api.iam-here.site/location?x=${lon}&y=${lat}`
    );
    setMyMap(response.data.data);
    setIsLoading(true);
  };

  return (
    <>
      <Background>
        <Content>
          <Icon src={back_icon} />
          <Address>
            {mymap.roadAddress} / {mymap.w3w}
          </Address>
          <Icon src={refresh_icon} />
        </Content>
        <Maps id="map" />
        <List>
          <Svg_bar
            width="100"
            height="5"
            style={{ backgroundColor: "#EBEBEB", borderRadius: 25 }}
          />
          <Report_list>신고 도착지 목록</Report_list>
          <Report_txt>
            복사 버튼을 누르면 문자 보내기 전 상태로 보내집니다.
          </Report_txt>
          <Report_section>
            <img src={img_119} />
            <div>
              <Report_num>119</Report_num>
              <Report_ex>긴급 각종 재난 - 구조 신고처</Report_ex>
            </div>
            <Report_button>문자 보내기</Report_button>
          </Report_section>
          <Report_section>
            <img src={img_112} />
            <div>
              <Report_num>112</Report_num>
              <Report_ex>긴급 각종 범죄 신고처</Report_ex>
            </div>
            <Report_button>문자 보내기</Report_button>
          </Report_section>
          <Report_section>
            <Num_110>110</Num_110>
            <div>
              <Report_num>110</Report_num>
              <Report_ex>비긴급 민원 상담 신고처</Report_ex>
            </div>
            <Report_button>문자 보내기</Report_button>
          </Report_section>
          {isloading && <Share mymap={mymap} />}
        </List>
      </Background>
    </>
  );
};

const Background = styled.div`
  border-radius: 30px;
  box-shadow: 3px 3px 15px #e6e6e6;
  position: absolute;
  top: 200px;
  left: 50%;
  transform: translateX(-50%);
  width: 431px;
  height: 896px;
  border: 1px solid black;
  overflow: hidden;
`;

const Content = styled.span`
  display: grid;
  align-items: center;
  grid-template-columns: 1fr 5fr 1fr;
  margin: 10px;
  background: white;
  border-radius: 35px;
  width: 410px;
  height: 50px;
  text-align: center;
  box-shadow: 3px 3px 15px #00000029;
`;

const Address = styled.span`
  align-items: center;
  font-size: 15px;
`;

const Icon = styled.img`
  width: 35px;
  margin: 5px;
`;
const Maps = styled.div`
  width: 431px;
  height: 896px;
  position: absolute;
  z-index: -1;
  left: 0px;
  top: 0;
  border-radius: 25px;
`;

const List = styled.div`
  background: white;
  border-radius: 20px 20px 0 0;
  width: 431px;
  height: 420px;
  position: absolute;

  top: 480px;
  color: black;
  z-index: 2;
`;

const Svg_bar = styled.svg`
  margin-left: 164px;
  margin-top: 15px;
`;

const Report_list = styled.h3`
  font-size: 24px;
  margin-top: 25px;
  margin-left: 20px;
  margin-bottom: 0px;
`;

const Report_section = styled.div`
  display: flex;
  margin-top: 15px;
  align-items: center;
`;
const Report_txt = styled.span`
  font-size: 13px;
  color: #000000;
  opacity: 0.5;
  margin-top: 0;
  margin-left: 20px;
`;

const Report_num = styled.h3`
  margin: 0px;
  margin-left: 10px;
`;

const Report_ex = styled.p`
  margin-top: 0px;
  margin-left: 10px;
  font-size: 12px;
  opacity: 50%;
`;

const Report_button = styled.button`
  width: 100px;
  height: 30px;
  border-radius: 20px;
  margin-left: 30px;
  border: none;
  color: white;
  background: black;
  align-items: center;
  margin-left: auto;
  margin-right: 20px;
`;

const Num_110 = styled.div`
  width: 44px;
  height: 30px;
  font-size: 26px;
  text-align: center;
  color: #efefef;
  font-weight: bold;
  margin-left: 26px;
`;
export default Map;
