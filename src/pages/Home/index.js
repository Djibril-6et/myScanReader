import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../../components/Header";
import serverService from "../../services/server.service";
import {useNavigation} from '@react-navigation/native';

const Index = () => {
  const [mangas, setMangas] = useState([]);

  const navigation = useNavigation();

  useEffect(() => {
    serverService
      .getMangas()
      .then((response) => {
        setMangas(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <Wrapper>
      <HomeContent>
        <Grid>
          {mangas &&
            mangas.map((manga) => (
              <>
                <Card onPress={() => navigation.navigate('MangaScans', { mangaName : manga })}>
                  <ImageT
                    source={{
                      uri: `http://localhost:7001/scans/${manga}/squared.jpeg`,
                    }}
                  />
                  <Title><MangaName>{manga}</MangaName></Title>
                </Card>
              </>
            ))}
        </Grid>
      </HomeContent>
      <HeaderView />
    </Wrapper>
  );
};

const Wrapper = styled.View`
  height: 100%;
  width: 100%;
`;

const HomeContent = styled.ScrollView`
  width: 95%;
  /* margin: 0 auto; */
  margin: 50px auto 0 auto;
`;

const Grid = styled.View`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const Card = styled.TouchableOpacity`
  width: 48%;
  height: 200px;
  margin: 0 0 10px 0;
`;

const ImageT = styled.Image`
  width: 100%;
  height: 85%;
`;

const Title = styled.View`
    height: 10%;
    margin: auto 0;
`;
const MangaName = styled.Text`
    color: white;
    margin: auto 0;
`;

const HeaderView = styled(Header)``;

export default Index;
