import { React, useContext, useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigation } from "@react-navigation/native";
import I18n from "../../traduction/i18n";
import { LanguageContext } from "../../traduction/LanguageContext";
import { Alert } from "react-native";
import IconMenu from "../../assets/menu.png";
import IconHome from "../../assets/home.png";
import IconFav from "../../assets/favorites.png";
import Switcher from "../ThemeSwitcher";
import { Share } from "react-native";
import notifee from "@notifee/react-native";
import ShareIcon from "../../assets/share.png";
import ShareIconDark from "../../assets/share-dark.png";
import NotificationIcon from "../../assets/bell.png";
import NotificationIconDark from "../../assets/bell-dark.png";
import { useDispatch, useSelector } from "react-redux";

const Index = ({ toggleTheme, myTheme }) => {
  const navigation = useNavigation();
  const [currentTheme, setCurrentTheme] = useState(myTheme);
  const [isModal, setIsModal] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("");

  const viewedPageList = useSelector(
    (state) => state.viewedpage.lastViewedPages
  );

  const { setLanguage } = useContext(LanguageContext);

  const getNumberReadedChapter = () => {
    let number = viewedPageList.length;
    return `Vous avez lu ${number} chapitre(s) !`;
  }

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
      body: getNumberReadedChapter(),
      android: {
        channelId: "default",
      },
    });
  };

  const getSendIcon = (theme) => {
    return theme === "dark" ? ShareIcon : ShareIconDark;
  };

  const getNotificationIcon = (theme) => {
    return theme === "dark" ? NotificationIcon : NotificationIconDark;
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
        <FlexModal>
          <CloseMenuView onPress={() => setIsModal(!isModal)} />
          <MenuContainer>
            <Top>
              <HeadView>
                <CloseModal onPress={() => setIsModal(!isModal)}>
                  <CloseText>X</CloseText>
                </CloseModal>
              </HeadView>

              <MenuTitleView>
                <MenuTitle>MENU</MenuTitle>
              </MenuTitleView>

              <TitleView>
                <TitleText>{I18n.t("selectLanguage")}</TitleText>
                <Divider />
              </TitleView>
              <Translation>
                <TranslationButton onPress={() => setLanguage("en")}>
                  <ButtonText size={"30px"}>🇬🇧</ButtonText>
                </TranslationButton>
                <TranslationButton onPress={() => setLanguage("fr")}>
                  <ButtonText size={"30px"}>🇫🇷</ButtonText>
                </TranslationButton>
                <TranslationButton onPress={() => setLanguage("pt")}>
                  <ButtonText size={"30px"}>🇵🇹</ButtonText>
                </TranslationButton>
              </Translation>
              <TitleView>
                <TitleText>{I18n.t("selectTheme")}</TitleText>
                <Divider />
              </TitleView>
              <Switcher toggleTheme={toggleTheme} />
            </Top>
            <Bot>
              <Button onPress={share}>
                <IconShare source={getSendIcon(currentTheme)} />
              </Button>
              <Button onPress={handleNotification}>
                <IconShare source={getNotificationIcon(currentTheme)} />
              </Button>
            </Bot>
          </MenuContainer>
        </FlexModal>
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
  font-size: ${(props) => props.size || "18px"};
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
  width: 7%;
  height: 40%;
`;

const FavoritesIcon = styled.Image`
  width: 100%;
  height: 100%;
`;

const MenuModal = styled.Modal``;

const FlexModal = styled.View`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
`;

const CloseMenuView = styled.TouchableOpacity`
  width: 30%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.7);
`;

const MenuContainer = styled.View`
  width: 70%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: ${(props) => props.theme.primaryColor};
`;

const Top = styled.View`
  background-color: ${(props) => props.theme.primaryColor};
`;

const Bot = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: ${(props) => props.theme.primaryColor};
`;

const HeadView = styled.View`
  align-items: center;
  height: 55px;
  padding: 0 0 0 10px;
  margin: 0 0 20px 0;
  background-color: ${(props) => props.theme.secondaryColor};
`;

const CloseModal = styled.TouchableOpacity`
  height: 35px;
  margin: auto auto 0 0;
  /* border-radius: 5px;
  background-color: ${(props) => props.theme.secondaryColor}; */
`;

const CloseText = styled.Text`
  color: ${(props) => props.theme.text};
  margin: auto 0;
  font-size: 20px;
`;

const Translation = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 85%;
  margin: 0 0 10px 0;
`;

const TranslationButton = styled.TouchableOpacity`
  background-color: ${(props) => props.theme.secondaryColor};
  width: 30%;
  padding: 5px;
  margin: 10px;
  border-radius: 5px;
`;

const TitleView = styled.View`
  width: 92%;
  height: 30px;
  margin: 0 auto;
`;

const TitleText = styled.Text`
  margin: auto 0;
  color: ${(props) => props.theme.text};
`;

const MenuTitleView = styled.View`
  width: 92%;
  height: 50px;
  margin: 0 auto 10px auto;
`;

const MenuTitle = styled.Text`
  margin: auto;
  color: ${(props) => props.theme.text};
  font-size: 30px;
`;

const Divider = styled.View`
  width: 100%;
  height: 1px;
  background-color: ${(props) => props.theme.text};
`;

const IconShare = styled.Image``;

export default Index;
