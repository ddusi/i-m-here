/*global kakao*/
import React, { useEffect } from "react";
import styled from "styled-components";

const Map = () => {
  useEffect(() => {
    let container = document.getElementById("map");
    let options = {
      center: new kakao.maps.LatLng(37.506502, 127.053617),
      level: 3,
    };

    const map = new kakao.maps.Map(container, options);
  }, []);

  return (
    <>
      <button>here</button>
      <Maps id="map"></Maps>
    </>
  );
};

const Maps = styled.div`
  width: 400px;
  height: 400px;
  border: 1px solid red;
`;

export default Map;
