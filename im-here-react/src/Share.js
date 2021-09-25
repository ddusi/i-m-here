import React from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import styled from "styled-components";

const Share = ({ mymap }) => {
  const shareText = `🎤 현재 위치는 ${mymap.roadAddress}입니다. 
  w3w주소 : ${mymap.w3w}
  위도 : ${mymap.location.latitude}
  경도 : ${mymap.location.longitude}
  카카오맵 : ${mymap.kakaoMap}`;
  return (
    <>
      {console.log(mymap.location.latitude, mymap.location.longitude)}
      <CopyToClipboard text={shareText}>
        <Button>위치 복사하기</Button>
      </CopyToClipboard>
    </>
  );
};

const Button = styled.button`
  margin-top: 40px;
  margin-left: 55px;
  background: #56b960;
  width: 180px;
  height: 66px;
  z-index: 1;
  border: none;
  border-radius: 60px;
  padding: 15px 24px 15px 24px;
  text-decoration: none;
  color: white;
  font-size: 20px;
  font-weight: bold;
  text-aling: center;

  &: hover {
    background: #5ba562;
  }
`;

export default Share;
