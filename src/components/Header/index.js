import { React, useContext } from "react";
import styled from "styled-components";
import Pdf from "react-native-pdf";
import { useNavigation } from "@react-navigation/native";
import I18n from "../../traduction/i18n";
import { LanguageContext } from "../../traduction/LanguageContext";
import { Text, View, TouchableOpacity } from "react-native";

const Index = () => {
  const navigation = useNavigation();

  const { setLanguage } = useContext(LanguageContext);

  return (
    <>
      <Background onPress={() => navigation.navigate("Favorites")}>
        <Title>{I18n.t("fav")} </Title>
      </Background>
      <Translation>
        <TouchableOpacity onPress={() => setLanguage("en")}>
          <Title>English</Title>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setLanguage("fr")}>
          <Title>Français</Title>
        </TouchableOpacity>
      </Translation>
    </>
  );
};

const Background = styled.TouchableOpacity`
  width: 100%;
  height: 10%;
  background-color: ${(props) => props.theme.primaryGrey};
  /* position: absolute;
  bottom: 0; */
`;
const Translation = styled.View`
  display: flex;
  align-items: center;
  background-color: darkgray;
`;

const Title = styled.Text`
  color: #fff;
  text-align: center;
  height: 20px;
  margin: auto;
  font-size: 15px;
`;

export default Index;
