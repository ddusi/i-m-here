import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import "./assets/Location.css";

const Location = () => {
  const [openMap, setOpenMap] = useState(false);

  // const onToggle = () => {
  //   setOpenMap(!openMap);
  // };
  return (
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
        <SubTitle>안녕하세요!</SubTitle>
        <MainTitle>내 위치를 찾아볼까요?</MainTitle>
        <Emoji>💁</Emoji>
        <Button to="/map">Get started</Button>
        <div class="balloon1">
          <h6>너.. 지금 어디야? 못 찾겠어 😭</h6>
        </div>
        <div class="balloon2">
          <h6>
            🎤 현재 위치는 부산시 … <br />
            w3w주소 : 날개.휴업.어묵 <br />
            위도 : 129.09343339999998 <br />
            경도 : 35.2296821 … <br />
            <br />
            여기로 와!
          </h6>
        </div>
      </Container>
    </Background>
  );
};

const Background = styled.div`
  border-radius: 30px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  box-shadow: 3px 3px 15px #e6e6e6;
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
  margin-bottom: 25px;
  font-size: 30px;
  display: grid;
  grid-template-columns: 1fr 2fr;
  align-items: center;
  font-family: "Poppins", sans-serif;
`;

const SubTitle = styled.h3`
  margin-bottom: 3px;
  font-size: 24px;
`;

const MainTitle = styled.h2`
  margin-top: 0;
  font-size: 30px;
`;

const Emoji = styled.div`
  font-size: 100px;
  margin-top: 30px;
  margin-bottom: 30px;
`;

const Button = styled(Link)`
  background: #56b960;
  width: 180px;
  height: 66px;
  z-index: 1;
  border: none;
  border-radius: 60px;
  padding: 15px 24px 15px 24px;
  text-decoration: none;
  color: white;
  font-size: 24px;
  font-family: "Poppins", sans-serif;

  &: hover {
    background: #5ba562;
  }
`;

export default Location;
