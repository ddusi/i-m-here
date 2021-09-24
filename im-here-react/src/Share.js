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
        <Button>공유하기</Button>
      </CopyToClipboard>
    </>
  );
};

const Button = styled.button`
  display: none;
`;

export default Share;
