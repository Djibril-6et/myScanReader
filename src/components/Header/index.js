import React from "react";
import styled from "styled-components";
import Pdf from "react-native-pdf";

const Index = () => {
  const source = {
    uri: "http://localhost:7001/scan/Naruto/chap/1.pdf",
    cache: true,
  };

  return (
    <>
      <Background>
        <Title>My Scans Reader</Title>
      </Background>
      {/* <Test
        source={source}
        onError={(error) => {
          console.log(error);
        }}
        onPressLink={(uri) => {
          console.log(`Link pressed: ${uri}`);
        }}
      /> */}
    </>
  );
};

const Test = styled(Pdf)`
  width: 100%;
  height: 100%;
`;

const Background = styled.View`
  width: 100%;
  height: 10%;
  background-color: ${props => props.theme.primaryGrey};
  /* position: absolute;
  bottom: 0; */
`;

const Title = styled.Text`
  color: #fff;
  text-align: center;
  height: 40%;
  margin: auto;
  font-size: 30px;
`;

export default Index;
