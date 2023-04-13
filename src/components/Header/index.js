import { React, useContext, useState } from "react";
import styled from "styled-components";
import { useNavigation } from "@react-navigation/native";
import I18n from "../../traduction/i18n";
import { LanguageContext } from "../../traduction/LanguageContext";
import { Text, View, TouchableOpacity } from "react-native";
import IconMenu from "../../assets/menu.png";
import IconHome from "../../assets/home.png";
import IconFav from "../../assets/favorites.png";

const Index = () => {
  const navigation = useNavigation();

  const [isModal, setIsModal] = useState(false);

  const { setLanguage } = useContext(LanguageContext);

  return (
    <>
      <Header>
        <HomeBtn onPress={() => navigation.navigate("Home")}>
          <HomeIcon source={IconHome} />
        </HomeBtn>
        <FavoritesBtn onPress={() => navigation.navigate("Favorites")}>
          <FavoritesIcon source={IconFav} />
        </FavoritesBtn>
        <MenuBtn onPress={() => setIsModal(!isModal)}>
          <MenuIcon source={IconMenu} />
        </MenuBtn>
      </Header>

      <MenuModal visible={isModal} transparent={true}>
        <CloseMenuView onPress={() => setIsModal(!isModal)}>
          <MenuContainer>
            <HeadView>
              <CloseModal onPress={() => setIsModal(!isModal)}>
                <CloseText>{I18n.t("close")} </CloseText>
              </CloseModal>
            </HeadView>
            <Translation>
              <TouchableOpacity onPress={() => setLanguage("en")}>
                <Title>English</Title>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setLanguage("fr")}>
                <Title>Français</Title>
              </TouchableOpacity>
            </Translation>
          </MenuContainer>
          </CloseMenuView>
      </MenuModal>
    </>
  );
};

const Header = styled.View`
  width: 100%;
  height: 10%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 10px 10px 0 10px;
  background-color: ${(props) => props.theme.primaryGrey};
  /* position: absolute;
  bottom: 0; */
`;

const Title = styled.Text`
  color: #fff;
  text-align: center;
  height: 20px;
  margin: auto;
  font-size: 15px;
`;

const MenuBtn = styled.TouchableOpacity`
  width: 8%;
  height: 40%;
`;

const MenuIcon = styled.Image`
  width: 100%;
  height: 100%;
`;

const HomeBtn = styled.TouchableOpacity`
  width: 8%;
  height: 40%;
`;

const HomeIcon = styled.Image`
  width: 100%;
  height: 100%;
`;

const FavoritesBtn = styled.TouchableOpacity`
  width: 8%;
  height: 40%;
`;

const FavoritesIcon = styled.Image`
  width: 100%;
  height: 100%;
`;

const MenuModal = styled.Modal``;

const CloseMenuView = styled.TouchableOpacity`
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.7);
`;

const MenuContainer = styled.View`
  width: 70%;
  height: 100%;
  margin-left: auto;
  background-color: ${(props) => props.theme.primaryGrey};
`;

const HeadView = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 100px;
  padding: 0 0 0 10px;
  margin: 10px 0 0 0;
  background-color: ${(props) => props.theme.primaryGrey};
`;

const CloseModal = styled.TouchableOpacity`
  height: 35px;
`;

const CloseText = styled.Text`
  color: #fff;
  font-size: 20px;
`;

const Translation = styled.View`
  display: flex;
  align-items: center;
  background-color: darkgray;
`;

export default Index;
