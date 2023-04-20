import React, { useState } from 'react';
import styled from "styled-components"

const Index = ({toggleTheme}) => {

    const [isToggled, setIsToggled] = useState(false);

    const toggle = () => {
        setIsToggled(!isToggled)
        toggleTheme()
    }

    return (
        <Switcher onPress={toggle}>
            <TextSwitch>Switch</TextSwitch>
        </Switcher>
    );
}

const Switcher = styled.TouchableOpacity`
  background-color: ${(props) => props.theme.secondaryColor};
  padding: 10px;
  margin: 10px;
  border-radius: 5px;
`;

const TextSwitch = styled.Text`
  color: ${(props) => props.theme.text};
  font-size: 18px;
  text-align: center;
`;

export default Index;
