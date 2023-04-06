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
      <View>
        <TouchableOpacity onPress={() => setLanguage("en")}>
          <Text>English</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setLanguage("fr")}>
          <Text>Français</Text>
        </TouchableOpacity>
      </View>
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

const Title = styled.Text`
  color: #fff;
  text-align: center;
  height: 40%;
  margin: auto;
  font-size: 20px;
`;

export default Index;
