import React, { useEffect, useContext } from "react";
import styled from "styled-components";
import { useNavigation } from "@react-navigation/native";
import I18n from "../../traduction/i18n";
import { LanguageContext } from "../../traduction/LanguageContext";
import { useDispatch, useSelector } from "react-redux";
import { fetchMangas } from "../../redux/actions/mangas";
import { Skeleton, Stack } from "@rneui/themed";
import { View } from "react-native";

const Index = () => {
  const navigation = useNavigation();

  const { language } = useContext(LanguageContext);

  const mangasList = useSelector((state) => state.mangas.mangasList);
  const isLoading = useSelector((state) => state.mangas.isLoading);
  const isError = useSelector((state) => state.mangas.error);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMangas());
  }, []);

  while (isLoading)
    return (
      <ErrorView>
        <LoadingBgColor>
          <ErrorText>Loading</ErrorText>
          <ErrorContainer>
            <SkeletonFlex>
              <Skeleton circle animation="wave" width={40} height={40} />
              <Skeleton circle animation="wave" width={40} height={40} />
              <Skeleton circle animation="wave" width={40} height={40} />
              <Skeleton circle animation="wave" width={40} height={40} />
            </SkeletonFlex>
          </ErrorContainer>
        </LoadingBgColor>
      </ErrorView>
    );

  if (isError)
    return (
      <ErrorView>
        <ErrorText>{I18n.t("errorHomePage")}</ErrorText>
      </ErrorView>
    );

  return (
    <Container>
      <ContentContainer>
        <Grid>
          {mangasList &&
            mangasList.map((manga) => (
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
  background-color: ${(props) => props.theme.primaryColor};
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
  background-color: ${(props) => props.theme.secondaryColor};
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
  color: ${(props) => props.theme.text};
  padding: 15px;
`;

// ERROR AND LOADING

const ErrorView = styled.View`
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.primaryColor};
`;

const ErrorContainer = styled.View`
  width: 100%;
`;

const SkeletonFlex = styled.View`
  margin: 5px auto auto auto;
  font-size: 30px;
  display: flex;
  flex-direction: row;
`;

const LoadingBgColor = styled.View`
  margin: auto;
`;

const ErrorText = styled.Text`
  font-size: 30px;
  margin: auto;
  color: ${(props) => props.theme.text};
`;

export default Index;
