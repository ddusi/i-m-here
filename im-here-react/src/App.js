import React from "react";
import Routes from "./Routes";
import { Helmet } from "react-helmet";
import here from "./assets/mobile-here.png";
function App() {
  const currentUrl = document.location.href;
  return (
    <div className="App">
      {/* <Helmet>
        <meta property="og:url" content={currentUrl}></meta>
        <meta property="og:title" content="Here - 내 위치 공유하기" />
        <meta
          property="og:description"
          content="쉬운 실시간 위치 공유 서비스 Here"
        />
        <meta property="og:image" content={here} />
        <title>HERE - 나 여기야</title>
        {/* <link rel="icon" href={}/> */}
      {/* </Helmet> */}
      <Routes />
    </div>
  );
}

export default App;
