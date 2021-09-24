import React, { useState } from "react";
import styled from "styled-components";
import Map from "./Map";

const Location = () => {
  const [openMap, setOpenMap] = useState(false);

  const onToggle = () => {
    setOpenMap(!openMap);
  };
  return (
    <div>
      <Button onClick={onToggle}>위치 찾기</Button>
      {openMap && <Map />}
    </div>
  );
};

const Button = styled.button`
  background: #e3e3e3;
  z-index: 1;
  border: none;
  border-radius: 1em;
  padding: 10px 20px 10px 20px;
  font-weight: bold;

  &: hover {
    background: #dbdbdb;
  }
`;

export default Location;
