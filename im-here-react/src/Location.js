import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import "./assets/Location.css";
import imhere_logo from "./assets/hw-img_logo.png";
import hiking from "./assets/hiking.jpg";

const Location = () => {
  return (
    <Background>
      <Container>
        <Title>
          <img src={imhere_logo} />
        </Title>
        <>
          <Content>
            <Balloon_wh>
              <Balloon_txt>산 중턱에서 길을 잃어버렸어요</Balloon_txt>
            </Balloon_wh>
            <Img src={hiking} width="315px" />
          </Content>
          <Content>
            <Balloon_yel>
              <Balloon_txt>위치가 어디세요</Balloon_txt>
            </Balloon_yel>
            <Balloon_yel>
              <Balloon_txt>
                'W3W(what3words, 세 단어 주소)'는 산 속, 바다 위, 건물 내부 등
                전세계 어느 지역이든 '3m x 3m' 단위로 정밀하게 측정할 수
                있습니다
              </Balloon_txt>
            </Balloon_yel>
          </Content>
        </>
        <Button>
          <Started to="/map">내 위치 알아보기</Started>
        </Button>
      </Container>
    </Background>
  );
};

const Background = styled.div`
  background: #ebebeb 0% 0% no-repeat padding-box;
  border-radius: 30px;
  position: absolute;
  top: 200px;
  left: 50%;
  transform: translateX(-50%);
  box-shadow: 3px 3px 15px #e6e6e6;
  width: 428px;
  height: 926px;
`;

const Container = styled.div`
  height: 886px;
  margin-left: 20px;
  margin-right: 20px;
  margin-top: 20px;
`;

const Title = styled.h5`
  width: 120px;
  margin-top: 30px;
`;

const Content = styled.div``;

const Img = styled.img`
  margin-top: 10px;
  border-radius: 25px;
  margin-left: 70px;
`;
const Button = styled.div`
  background: #000000;
  width: 388px;
  height: 60px;
  position: relative;
  top: 220px;
  z-index: 1;
  border: none;
  border-radius: 20px 20px 0px 20px;
  font-size: 24px;
  font-family: "Poppins", sans-serif;
  text-align: center;
  display: table-cell;
  vertical-align: middle;

  &: hover {
    background: #454545;
  }
`;

const Started = styled(Link)`
  color: white;
  text-decoration: none;
  font-size: 18px;
`;

const Balloon_wh = styled.span`
  width: 315px;
  height: 60px;
  background: #ffffff 0% 0% no-repeat padding-box;
  border-radius: 20px 0px 20px 20px;
  border: 1px solid transparent;
  opacity: 1;
  margin-left: 70px;
  display: inline-block;
  text-align: center;
  vertical-align: middle;
`;

const Balloon_yel = styled.div`
  background: #fbbc04 0% 0% no-repeat padding-box;
  margin: 10px;
  display: inline-block;
  border: 1px solid transparent;
  border-radius: 0px 20px 20px 20px;
  max-width: auto;
`;

const Balloon_txt = styled.p`
  margin: 20px;
  font-weight: bold;
  font-size: 20px;
`;

export default Location;
