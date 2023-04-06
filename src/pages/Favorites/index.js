import React, { useEffect } from "react";
import Header from "../../components/Header";
import { Alert } from "react-native";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { deleteFromFavorites } from "../../redux/actions/favorites";
import Trash from "../../assets/trash.png";
import { useNavigation } from "@react-navigation/native";
import I18n from "../../traduction/i18n";

const Index = () => {
  const favList = useSelector((state) => state.favorites.favoritesList);
  const dispatch = useDispatch();

  const navigation = useNavigation();

  const delete_from_favorites = (id) => {
    Alert.alert("Delete", "Are you sure you want to delete this manga ?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "YES",
        onPress: () => {
          dispatch(deleteFromFavorites(id));
        },
      },
    ]);
  };

  return (
    <Container>
      <TitleView>
        <TitleText>{I18n.t("mesFavs")}</TitleText>
      </TitleView>

      <FavListView>
        {favList &&
          favList.map((item) => (
            <MangaWrapper key={item.manga}>
              <MangaViewImage
                onPress={() =>
                  navigation.navigate("MangaScans", { mangaName: item.manga })
                }
              >
                <ImageView
                  source={{
                    uri: `http://localhost:7001/scans/${item.manga}/banner.jpeg`,
                  }}
                />
              </MangaViewImage>
              <DeleteView onPress={() => delete_from_favorites(item.manga)}>
                <DeleteImage source={Trash} />
              </DeleteView>
            </MangaWrapper>
          ))}
      </FavListView>

      <MyHeader />
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  background-color: #fff;
`;

const TitleView = styled.View`
  width: 100%;
  height: 70px;
  margin-top: 50px;
`;

const TitleText = styled.Text`
  color: black;
  margin: auto;
  font-size: 45px;
`;

const FavListView = styled.ScrollView`
  padding-top: 15px;
`;

const MangaWrapper = styled.View`
  width: 95%;
  height: 120px;
  margin: 10px auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const MangaViewImage = styled.TouchableOpacity`
  width: 78%;
  height: 100%;
  border-radius: 12px;
  background-color: blue;
`;

const ImageView = styled.Image`
  width: 100%;
  height: 100%;
  border-radius: 12px;
`;

const DeleteView = styled.TouchableOpacity`
  width: 19%;
  height: 100%;
  background-color: ${(props) => props.theme.primaryGrey};
  border-radius: 12px;
`;

const DeleteImage = styled.Image`
  width: 70%;
  height: 40%;
  margin: auto;
`;

const MyHeader = styled(Header)``;

export default Index;
