import { React, useContext, useState } from "react";
import styled from "styled-components";
import { useNavigation } from "@react-navigation/native";
import I18n from "../../traduction/i18n";
import { LanguageContext } from "../../traduction/LanguageContext";
import { Text, View, TouchableOpacity, Alert } from "react-native";
import IconMenu from "../../assets/menu.png";
import IconHome from "../../assets/home.png";
import IconFav from "../../assets/favorites.png";
import Switcher from "../ThemeSwitcher";
import { Share } from "react-native";
import notifee from "@notifee/react-native";

const Index = ({ toggleTheme }) => {
  const navigation = useNavigation();

  const [isModal, setIsModal] = useState(false);

  const { setLanguage } = useContext(LanguageContext);

  // const share = () => {
  //   Share.open({
  //     url: "http://localhost:7001/scans",
  //     message: "Share the app"
  // }).catch(err => err && console.log(err));
  // }

  const share = () => {
    try {
      const result = Share.share({
        message:
          "Look at this new scan reader application | https://Appstore//MyScanReader",
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  const handleNotification = async () => {
    await notifee.requestPermission();
    await notifee.createChannel({
      id: "default",
      name: "Default Channel",
    });

    await notifee.displayNotification({
      title: "My Scan Reader",
      body: "N'oubliez pas de venir lire vos mangas préférez",
      android: {
        channelId: "default",
      },
    });
  };

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
              <Button onPress={() => setLanguage("en")}>
                <ButtonText>English</ButtonText>
              </Button>
              <Button onPress={() => setLanguage("fr")}>
                <ButtonText>Français</ButtonText>
              </Button>
            </Translation>
            <Switcher toggleTheme={toggleTheme} />
            <Button onPress={share}>
              <ButtonText>Share</ButtonText>
            </Button>
            <Button onPress={handleNotification}>
              <ButtonText>Send notification</ButtonText>
            </Button>
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
  background-color: ${(props) => props.theme.globalPrimaryColor};
`;

const Title = styled.Text`
  color: #fff;
  text-align: center;
  height: 20px;
  margin: auto;
  font-size: 15px;
`;

const Button = styled.TouchableOpacity`
  background-color: ${(props) => props.theme.secondaryColor};
  padding: 10px;
  margin: 10px;
  border-radius: 5px;
`;

const ButtonText = styled.Text`
  color: ${(props) => props.theme.text};
  font-size: 18px;
  text-align: center;
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
  background-color: ${(props) => props.theme.primaryColor};
`;

const HeadView = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 100px;
  padding: 0 0 0 10px;
  margin: 10px 0 0 0;
  background-color: ${(props) => props.theme.primaryColor};
`;

const CloseModal = styled.TouchableOpacity`
  height: 35px;
`;

const CloseText = styled.Text`
  color: ${(props) => props.theme.text};
  font-size: 20px;
`;

const Translation = styled.View`
  display: flex;
  align-items: center;
`;

export default Index;
