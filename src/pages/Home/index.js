import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import Header from "../../components/Header";
import serverService from "../../services/server.service";
import { useNavigation } from "@react-navigation/native";

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
    <Container>
      <HeaderContainer>
        <Header />
      </HeaderContainer>
      <ContentContainer>
        <Grid>
          {mangas &&
            mangas.map((manga) => (
              <Card
                key={manga}
                onPress={() =>
                  navigation.navigate("MangaScans", { mangaName: manga })
                }
              >
                <CardImage
                  source={{
                    uri: `http://localhost:7001/scans/${manga}/squared.jpeg`,
                  }}
                />
                <MangaTitle>{manga}</MangaTitle>
              </Card>
            ))}
        </Grid>
      </ContentContainer>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  background-color: #f8f8f8;
`;

const HeaderContainer = styled.View`
  margin-top: -10px;
  height: 100px;
  background-color: darkgray;
`;

const ContentContainer = styled.ScrollView`
  padding: 30px;
`;

const Grid = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
`;

const Card = styled.TouchableOpacity`
  width: 48%;
  margin-right: 2%;
  margin-bottom: 20px;
  background-color: #fff;
  border-radius: 8px;
`;

const CardImage = styled.Image`
  height: 200px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
`;

const MangaTitle = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: #333;
  padding: 15px;
`;

export default Index;
