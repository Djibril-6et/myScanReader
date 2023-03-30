import React from 'react';
import styled from 'styled-components';
import Pdf from 'react-native-pdf';
import { StyleSheet } from 'react-native';

const Index = () => {

  const source = {
    uri: 'http://localhost:7001/pdf-files/Camara_Ayoub_compte_rendu_entretien_B3_Projet_pro_2122.pdf',
    cache: true,
  };

  return (
    <>
      <Background>
        <Title>My Scans Reader</Title>
      </Background>
      <Pdf
        source={source}
        // onLoadComplete={(numberOfPages, filePath) => {
        //   console.log(`Number of pages: ${numberOfPages}`);
        // }}
        // onPageChanged={(page, numberOfPages) => {
        //   console.log(`Current page: ${page}`);
        // }}
        onError={error => {
          console.log(error);
        }}
        onPressLink={uri => {
          console.log(`Link pressed: ${uri}`);
        }}
        style={styles.pdf}
      />
    </>
  );
};

const styles = StyleSheet.create({
  
  pdf: {
      width: '100%',
      height: '100%',
  }
});

const Background = styled.View`
  width: 100%;
  height: 15%;
  background-color: #000;
  /* position: absolute;
  bottom: 0; */
`;

const Title = styled.Text`
  color: #fff;
  text-align: center;
  height: 40%;
  margin-top: auto;
  margin-bottom: 0;
  font-size: 30px;
`;

export default Index;
