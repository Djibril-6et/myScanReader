import React, { useEffect, useState } from "react";
import { Text } from "react-native";
import styled from "styled-components";
import Header from "../../components/Header";
import serverService from "../../services/server.service";

const Index = (props) => {
  const [manga, setManga] = useState("");
  const [chapters, setChapters] = useState([]);

  useEffect(() => {
    setManga(props.route.params.mangaName);
    serverService
      .getChapters(props.route.params.mangaName)
      .then((response) => {
        setChapters(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <Wrapper>
      <Banner
        source={{ uri: `http://localhost:7001/scans/${manga}/banner.jpeg` }}
      />
      <MangaContent>
        <Title>
          <MangaName>{manga}</MangaName>
        </Title>

        {chapters &&
          chapters.map((chapter) => (
            <>
              <Text>{chapter}</Text>
            </>
          ))}
      </MangaContent>
      <HeaderView />
    </Wrapper>
  );
};

const Wrapper = styled.View`
  height: 100%;
  width: 100%;
`;

const Banner = styled.Image`
  width: 100%;
  height: 150px;
`;

const MangaContent = styled.ScrollView`
  width: 90%;
  margin: 20px auto 0 auto;
  background-color: red;
`;

const Title = styled.View`
  height: 70px;
  background-color: blue;
`;
const MangaName = styled.Text`
  color: white;
  margin: auto 0;
  font-size: 30px;
`;

const HeaderView = styled(Header)``;

export default Index;
