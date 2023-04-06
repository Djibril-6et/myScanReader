import React from "react";
import styled from "styled-components";
import Pdf from "react-native-pdf";
import { useNavigation } from "@react-navigation/native";
import I18n from "../../traduction/i18n";

const Index = () => {
  const navigation = useNavigation();

  return (
    <>
      <Background onPress={() => navigation.navigate("Favorites")}>
        <Title>{I18n.t("fav")} </Title>
      </Background>
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
